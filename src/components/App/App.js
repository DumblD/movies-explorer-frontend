import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { moviesApi } from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi';
import * as auth from './../../utils/auth';
import Main from './../../components/Main/Main';
import Movies from './../../components/Movies/Movies';
import SavedMovies from './../../components/SavedMovies/SavedMovies';
import Register from './../../components/Register/Register';
import Login from './../../components/Login/Login';
import Profile from './../../components/Profile/Profile';
import NotFoundPage from './../../components/NotFoundPage/NotFoundPage';
import ProtectedRouteElement from "./../../components/ProtectedRoute/ProtectedRoute";
import ConfirmDelCardPopup from './../../components/ConfirmDelCardPopup/ConfirmDelCardPopup';
import {
  mobileWidthMediaQuery,
  tabletWidthMediaQuery,
  desktopWidthMediaQuery,
  shortMovieDuration,
  errorGetMoviesRequestMessageText,
  errorNotFoundMessageText,
  errorSearchTextInValidMessage,
  errorUpdateInfoRequestMessageText,
  infoUpdateInfoRequestMessageText,
  errorLoginInfoRequestMessageText,
  errorRegisterInfoRequestMessageText,
  isSearchTextValid,
  searchFilterParams,
} from '../../utils/constants/constants';
/* import { useFilterMovies } from '../../utils/customHooks/useFilterMovies'; */
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { CurrentUserEmail } from '../../contexts/CurrentUserEmail';

/* import { useLocalStorage } from './../../utils/customHooks/useLocalStorage'; */

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
  const [isUpdateUserSuccess, setIsUpdateUserSuccess] = useState(false);
  const [errorRequestMessage, setErrorRequestMessage] = useState('');
  const [infoRequestMessage, setInfoRequestMessage] = useState('');
  const [isInfoMessageActive, setIsInfoMessageActive] = useState(false);
  const [selectedCardToDelete, setSelectedCardToDelete] = useState({});
  const [isConfirmDelCardPopupOpen, setIsConfirmDelCardPopupOpen] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isPreloaderActive, setIsPreloaderActive] = useState(false);
  const [findMovieText, setFindMovieText] = useState('');

  const [moviesCards, setMoviesCards] = useState([]);
  const [savedMoviesCards, setSavedMoviesCards] = useState([]);
  const [moviesCardsNumToRender, setMoviesCardsNumToRender] = useState(0);
  const [numOfExtraCards, setNumOfExtraCards] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isShortMovies, setIsShortMovies] = useState(false);

  const [isSearchTextSame, setIsSearchTextSame] = useState('');

  const [textFilteredMovies, setTextFilteredMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const navigate = useNavigate();

  function handleRequest(request) {
    togglePreloader(true);
    request()
      .catch((err) => {
        console.log(err);
        getErrorRequestMessage(errorGetMoviesRequestMessageText);
      })
      .finally(() => {
        togglePreloader(false);
      });
  }

  // eslint-disable-next-line no-unused-vars
  function getMoviesCards() {
    function makeRequest() {
      return moviesApi.getMoviesCards()
        .then((data) => {
          setMoviesCards(data);
        })
    }
    handleRequest(makeRequest);
  }

  function getSavedMoviesCards() {
    function makeRequest() {
      return mainApi.getSavedMoviesCards()
        .then((data) => {
          setSavedMoviesCards(data);
        })
    }
    handleRequest(makeRequest);
  }

  function onLogin(loginData, clearInputs) {
    auth.authorize(loginData)
      .then(() => {
        const isAuthorized = localStorage.getItem('isAuthorized');
        setLoggedIn(true);
        if (isAuthorized) {
          clearInputs();
          setCurrentUserEmail(loginData.email);
          handleLogin();
          navigate('/', { replace: true });
        }
        return;
      })
      .catch(err => {
        getErrorRequestMessage(errorLoginInfoRequestMessageText);
        console.log(err);
      })
  }

  function onRegister(registerData, loginData, clearInputs) {
    auth.register(registerData)
      .then((data) => {
        if (data) {
          toggleIsRegister(true);
          onLogin(loginData, clearInputs);
        }
      }).catch((err) => {
        getErrorRequestMessage(errorRegisterInfoRequestMessageText);
        console.log(err);
        toggleIsRegister(false);
      });
  }

  function getUserInfo() {
    mainApi.getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        alert(err);
      });
  }

  function onLogout() {
    auth.logout()
      .then(() => {
        setLoggedIn(false);
        navigate('/', { replace: true });
      })
      .catch(err => {
        alert(`${err}
При выходе из аккаунта возникла ошибка.`);
      })
  }

  function handleUpdateUserInfo({ name, email }) {
    return mainApi.updateUserInfo(name, email)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        toggleIsUpdateUser(true);
        console.log(isUpdateUserSuccess);
        getInfoRequestMessage(infoUpdateInfoRequestMessageText);
      })
      .catch(err => {
        toggleIsUpdateUser(false);
        console.log(isUpdateUserSuccess);
        getErrorRequestMessage(errorUpdateInfoRequestMessageText);
        console.log(err);
      })
  }

  function checkWidth() {
    let numCardsToRender;
    if (mobileWidthMediaQuery.matches && !tabletWidthMediaQuery.matches) {
      setMoviesCardsNumToRender(moviesCardsNumToRender);
      setNumOfExtraCards(2);
      if (moviesCardsNumToRender > 5) {
        numCardsToRender = moviesCardsNumToRender;
      } else {
        numCardsToRender = 5;
      }
      setMoviesCardsNumToRender(numCardsToRender);
    } else if (!mobileWidthMediaQuery.matches && tabletWidthMediaQuery && !desktopWidthMediaQuery.matches) {
      setMoviesCardsNumToRender(moviesCardsNumToRender);
      setNumOfExtraCards(2);
      if (moviesCardsNumToRender > 8) {
        numCardsToRender = moviesCardsNumToRender - moviesCardsNumToRender % 2;
      } else {
        numCardsToRender = 8;
      }
      setMoviesCardsNumToRender(numCardsToRender);
    } else if (desktopWidthMediaQuery.matches) {
      setMoviesCardsNumToRender(moviesCardsNumToRender);
      setNumOfExtraCards(3);
      if (moviesCardsNumToRender > 12 && moviesCardsNumToRender % 3 !== 0) {
        numCardsToRender = Math.floor(moviesCardsNumToRender / 3) * 3 + 3;
      } else if (moviesCardsNumToRender % 3 === 0) {
        numCardsToRender = moviesCardsNumToRender;
      } else {
        numCardsToRender = 12;
      }
      setMoviesCardsNumToRender(numCardsToRender);
    }
  };

  function filterMoviesBySearchText(cardsList) {
    const textFilteredMoviesList = cardsList.map((cardElement) => {
      const isInclude = searchFilterParams.some((param) => {
        return cardElement[param].toLowerCase().includes(findMovieText);
      });
      return isInclude ? cardElement : null;
    }).filter((el) => {
      return el !== null;
    });
    setTextFilteredMovies(textFilteredMoviesList);
  }

  function filterMoviesByShort() {
    if (isShortMovies) {
      const shortFiltered = textFilteredMovies.filter((cardElement) => {
        return cardElement.duration <= shortMovieDuration;
      });
      if (!isSearchTextSame) {
        setMoviesCardsNumToRender(5);
        console.log('not same');
      } else {
        console.log('the same');
        setMoviesCardsNumToRender(moviesCardsNumToRender);
      }
      getFilteredMovies(shortFiltered);
    } else {
      getFilteredMovies(textFilteredMovies);
    }
  }

  function getFilteredMovies(moviesList) {
    const filteredMovies = moviesList.filter((card, index) => {
      return index < moviesCardsNumToRender;
    });
    setFilteredMovies(filteredMovies);
  }

// ------------------------

  function getErrorRequestMessage(message) {
    setErrorRequestMessage(message);
    setIsInfoMessageActive(true);
  }

  function getInfoRequestMessage(message) {
    setInfoRequestMessage(message);
    setIsInfoMessageActive(true);
  }

  function toggleIsUpdateUser(isSuccess) {
    setIsUpdateUserSuccess(isSuccess);
  }

  function toggleIsRegister(isSuccess) {
    setIsRegisterSuccess(isSuccess);
  }

  function closeAllPopups() {
    setIsConfirmDelCardPopupOpen(false);
  }

  function handleConfirmDelCardClick(card) {
    setSelectedCardToDelete(card);
    setIsConfirmDelCardPopupOpen(true);
  }

  function handleCardLike(card) {
    // Api request -> returns new card with updated like status
    const newMoviesCard = moviesCards.find((el) => {
      return card._id === el._id;
    });
    newMoviesCard.like = !card.like;
    // movies cards update (with card with updated like status)
    // eslint-disable-next-line no-unused-vars
    const updatedMoviesCards = moviesCards.map((cardElement) => {
      return cardElement._id === card._id ? newMoviesCard : cardElement;
    });
    /* setMoviesCards(
      updatedMoviesCards,
    ); */
  }

  /* function comparePreviousLastSearchMoviesText(inputValue) {
    const isSame = previousFindMovieText === inputValue;
    setIsTextSearchSame(isSame);
  } */

  function hideErrorMessages() {
    setErrorRequestMessage('');
    setInfoRequestMessage('');
    setIsInfoMessageActive(false);
  }

  function handleCardDelete(card) {
    handleCardLike(card);
    closeAllPopups();
  }

  function handleConfirmDelCard() {
    handleCardDelete(selectedCardToDelete);
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  function togglePreloader(isActive) {
    setIsPreloaderActive(isActive);
  }

/*   function handleShortMovies() {
    setIsShortMovies(!isShortMovies);
    getMoviesCardsToRender(moviesCards);
  }; */

  function handleShortSavedMovies() {
    // setIsShortSavedMovies(!isShortSavedMovies);
  };

  function resetSearchMoviesResults() {
    setFilteredMovies([]);
    setFindMovieText('');
    setIsShortMovies(false);
  }

  function handleSearchMovies() {
    // Api request
    hideErrorMessages();
    if (!isSearchTextValid(findMovieText)){
      getErrorRequestMessage(errorSearchTextInValidMessage);
      return;
    }
    checkWidth();
    if (!moviesCards.length) {
      getMoviesCards();
    }
    filterMoviesBySearchText(moviesCards);
/*     if (!moviesCards.length && findMovieText) {
      getMoviesCards();
    } else if (moviesCards.length && findMovieText) {
      getMoviesCardsToRender(moviesCards);
    } */
    // ...
  }

  useEffect(() => {
    if (moviesCards.length && !textFilteredMovies.length) {
      console.log(123);
      getErrorRequestMessage(errorNotFoundMessageText);
    }
    if (moviesCards.length && !filteredMovies.length && findMovieText){
      getErrorRequestMessage(errorNotFoundMessageText);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredMovies]);

  function handleSearchSavedMovies() {
    // function filters movies on front
    // ...
  }

  function toggleLoadMore(isActive) {
    setIsLoadMore(isActive);
  }

  function loadMoreCards() {
    // ...
  }

  function loadMoreSavedCards() {
    // function loadMore for Saved movies page
  }

  useEffect(() => {
    async function handleTokenCheck() {
      const isAuthorized = localStorage.getItem('isAuthorized');
      console.log(isAuthorized);
      if (!isAuthorized) {
        return;
      }
      const isToken = await auth.checkToken();
      if (isAuthorized && isToken) {
        mainApi.getUserInfo().then((userData) => {
          setCurrentUserEmail(userData.email);
          setLoggedIn(true);
          navigate("/", { replace: false });
        }).catch((err) => {
          alert(`${err}
  Что-то пошло не так. Попробуйте войти снова.`);
        })
      }
    }
    handleTokenCheck();
    hideErrorMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    useEffect(() => {
      window.addEventListener('resize', () => {
        setScreenWidth(window.innerWidth);
      });
      checkWidth();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [screenWidth, moviesCardsNumToRender]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentUserEmail.Provider value={currentUserEmail}>
        <Routes>
          <Route path="*" element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="/404" replace />} />
          <Route path="/" element={<ProtectedRouteElement
            element={Main}
            loggedIn={loggedIn}
            hideErrorMessages={hideErrorMessages}
          />} />
          <Route path="/movies" element={<ProtectedRouteElement
            element={Movies}
            loggedIn={loggedIn}
            checkWidth={checkWidth}
            moviesCards={moviesCards}
            moviesCardsNumToRender={moviesCardsNumToRender}
            filterMoviesByShort={filterMoviesByShort}
            filteredMovies={filteredMovies}
            textFilteredMovies={textFilteredMovies}
            isPreloaderActive={isPreloaderActive}
            findMovieText={findMovieText}
            setFindMovieText={setFindMovieText}
            isShortMovies={isShortMovies}
            setIsShortMovies={setIsShortMovies}
            onSearch={handleSearchMovies}
            handleCardLike={handleCardLike}
            isInfoMessage={isInfoMessageActive}
            errorMessageText={errorRequestMessage}
            hideErrorMessages={hideErrorMessages}
            isLoadMore={isLoadMore}
            onLoadMore={loadMoreCards}
            isSearchTextSame={isSearchTextSame}
            setIsSearchTextSame={setIsSearchTextSame}
          />} />
          <Route path="/saved-movies" element={<ProtectedRouteElement
            element={SavedMovies}
            loggedIn={loggedIn}
            getSavedMoviesCards={getSavedMoviesCards}
            isPreloaderActive={isPreloaderActive}
            handleRequest={handleRequest}
            cards={savedMoviesCards}
            handleConfirmDelCardClick={handleConfirmDelCardClick}
            onSearch={handleSearchSavedMovies}
            handleShortSavedMovies={handleShortSavedMovies}
            isShortFilms={isShortMovies}
            isLoadMore={isLoadMore}
            onLoadMore={loadMoreSavedCards}
            isInfoMessage={isInfoMessageActive}
          />} />
          <Route path="/signup" element={<Register
            onRegister={onRegister}
            errorRequestMessage={errorRequestMessage}
            isInfoMessageActive={isInfoMessageActive}
            hideErrorMessages={hideErrorMessages}
          />} />
          <Route path="/signin" element={<Login
            onLogin={onLogin}
            errorRequestMessage={errorRequestMessage}
            isInfoMessageActive={isInfoMessageActive}
            hideErrorMessages={hideErrorMessages}
          />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="/profile" element={<ProtectedRouteElement
            element={Profile}
            loggedIn={loggedIn}
            getUserInfo={getUserInfo}
            isUpdateUserSuccess={isUpdateUserSuccess}
            onUpdateUserinfo={handleUpdateUserInfo}
            onLogout={onLogout}
            errorRequestMessage={errorRequestMessage}
            infoRequestMessage={infoRequestMessage}
            isInfoMessageActive={isInfoMessageActive}
            hideErrorMessages={hideErrorMessages}
            resetSearchMoviesResults={resetSearchMoviesResults}
          />} />
        </Routes>
        <ConfirmDelCardPopup
          isOpen={isConfirmDelCardPopupOpen}
          onConfirmDelCard={handleConfirmDelCard}
          onClose={closeAllPopups}
        />
      </CurrentUserEmail.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
