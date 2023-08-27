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
  errorGetMoviesRequestMessageText,
  errorNotFoundMessageText,
  errorNotFoundOrEmpty,
  errorSearchTextInValidMessage,
  errorUpdateInfoRequestMessageText,
  infoUpdateInfoRequestMessageText,
  errorLoginInfoRequestMessageText,
  errorRegisterInfoRequestMessageText,
  defaultCardsNumRenderForMovies,
  defaultNumOfExtraCards,
  numOfExtraCardsForMobiles,
  numOfExtraCardsForTablets,
  numOfExtraCardsForDesktop,
  cardsNumRenderForMobiles,
  cardsNumRenderForTablets,
  cardsNumRenderForDesktop,
  defaultValueLastNumCardsRenderForStorage,
  defaultArrayLength,
  isSearchTextValid,
  sortMovieDataAddLike,
  filterByText,
  filterByDuration,
  getFilteredItems,
} from '../../utils/constants/constants';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { CurrentUserEmail } from '../../contexts/CurrentUserEmail';
import { useLocalStorage } from './../../utils/customHooks/useLocalStorage';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [isUpdateUserSuccess, setIsUpdateUserSuccess] = useState(false);
  const [errorRequestMessage, setErrorRequestMessage] = useState('');
  const [infoRequestMessage, setInfoRequestMessage] = useState('');
  const [isInfoMessageActive, setIsInfoMessageActive] = useState(false);
  const [selectedCardToDelete, setSelectedCardToDelete] = useState('');
  const [isConfirmDelCardPopupOpen, setIsConfirmDelCardPopupOpen] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isPreloaderActive, setIsPreloaderActive] = useState(false);
  const [findMovieText, setFindMovieText] = useState('');
  const [findSavedMovieText, setFindSavedMovieText] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [moviesCards, setMoviesCards] = useState([]);
  const [savedMoviesCards, setSavedMoviesCards] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [moviesCardsNumToRender, setMoviesCardsNumToRender] = useState(defaultCardsNumRenderForMovies);
  const [numOfExtraCards, setNumOfExtraCards] = useState(defaultNumOfExtraCards);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [isShortSavedMovies, setIsShortSavedMovies] = useState(false);
  const [isSearchTextSame, setIsSearchTextSame] = useState('');
  const [previousFindMovieText, setPreviousFindMovieText] = useState('');
  const [shortFilteredMoviesLength, setShortFilteredMoviesLength] = useState(defaultArrayLength);
  const [textFilteredMovies, setTextFilteredMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
  const [isMoviesPageOpen, setIsMoviesPageOpen] = useState(false);
  const {
    localStorageData,
    configureLastNumShowedMovieslocalStorage,
    configureMovieslocalStorageData,
    getLocalStorageForMovies,
    clearLocalStorage,
    setLikedMovieLocalStorage,
    deleteLikedMovieLocalStorage,
    checkIsFirstSignInLocalStorage,
    getLikedMoviesId,
  } = useLocalStorage();
  const navigate = useNavigate();

  function handleRequest(request) {
    setIsFetching(true);
    togglePreloader(true);
    request()
      .finally(() => {
        togglePreloader(false);
        setIsFetching(false);
      });
  }

  function getMoviesCards() {
    function makeRequest() {
      return moviesApi.getMoviesCards()
        .then((data) => {
          setMoviesCards(data);
        })
        .catch((err) => {
          getErrorRequestMessage(errorNotFoundOrEmpty);
          console.log(err);
        })
    }
    handleRequest(makeRequest);
  }

  function getSavedMoviesCards() {
    mainApi.getSavedMoviesCards()
      .then((data) => {
        setSavedMoviesCards(data.data);
      })
      .catch((err) => {
        console.log(err);
        getErrorRequestMessage(errorGetMoviesRequestMessageText);
      })
  }

  function onLogin(loginData, clearInputs) {
    auth.authorize(loginData)
      .then(() => {
        const isAuthorized = localStorage.getItem('isAuthorized');
        if (isAuthorized) {
          clearInputs();
          setCurrentUserEmail(loginData.email);
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
          onLogin(loginData, clearInputs);
        }
      }).catch((err) => {
        getErrorRequestMessage(errorRegisterInfoRequestMessageText);
        console.log(err);
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
        navigate('/', { replace: true });
      })
      .catch(err => {
        alert(`${err}
При выходе из аккаунта возникла ошибка.`);
      })
  }

  function handleCardLike(card) {
    const ownId = currentUser._id;
    const newMovieCard = sortMovieDataAddLike(card, ownId);
    mainApi.addNewSavedMovie(newMovieCard)
      .then((newCard) => {
        const {
          ...newMovieCard
        } = newCard;
        newMovieCard.movieId = newMovieCard._id;
        newMovieCard.id = newCard.movieId;
        setSavedMoviesCards([...savedMoviesCards, newMovieCard]);
        setLikedMovieLocalStorage(newCard.movieId);
      })
      .catch(console.error);
  }

  function handleCardDelete(card) {
    const deleteId = typeof card.movieId === 'string' ? card.movieId : card._id;
    return mainApi.deleteSavedMovie(deleteId)
      .then(() => {
        const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
        const updatedSavedMoviesCards = savedMovies.filter((cardElement) => {
          return cardElement.movieId !== card.movieId;
        });
        setSavedMoviesCards(updatedSavedMoviesCards);
        deleteLikedMovieLocalStorage(card);
      })
      .catch(console.error)
      .finally(() => {
        closeAllPopups();
      });
  }

  function handleUpdateUserInfo({ name, email }) {
    return mainApi.updateUserInfo(name, email)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        toggleIsUpdateUser(true);
        getInfoRequestMessage(infoUpdateInfoRequestMessageText);
      })
      .catch(err => {
        toggleIsUpdateUser(false);
        getErrorRequestMessage(errorUpdateInfoRequestMessageText);
        console.log(err);
      })
  }

  function checkWidth() {
    const lastNumShowed = localStorage.getItem('lastNumShowedMovies');
    let numCardsToRender;
    if (mobileWidthMediaQuery.matches && !tabletWidthMediaQuery.matches) {
      setNumOfExtraCards(numOfExtraCardsForMobiles);
      if (moviesCardsNumToRender > cardsNumRenderForMobiles) {
        if (isSearchTextSame || (lastNumShowed !== defaultValueLastNumCardsRenderForStorage && !isSearchTextSame)) {
          numCardsToRender = moviesCardsNumToRender;
        }
      } else {
        numCardsToRender = cardsNumRenderForMobiles;
      }
      setMoviesCardsNumToRender(numCardsToRender);
    } else if (!mobileWidthMediaQuery.matches && tabletWidthMediaQuery && !desktopWidthMediaQuery.matches) {
      setNumOfExtraCards(numOfExtraCardsForTablets);
      if (moviesCardsNumToRender > cardsNumRenderForTablets) {
        if (isSearchTextSame || (lastNumShowed !== defaultValueLastNumCardsRenderForStorage && !isSearchTextSame)) {
          numCardsToRender = moviesCardsNumToRender - moviesCardsNumToRender % numOfExtraCardsForTablets;
        }
      } else {
        numCardsToRender = cardsNumRenderForTablets;
      }
      setMoviesCardsNumToRender(numCardsToRender);
    } else if (desktopWidthMediaQuery.matches) {
      setNumOfExtraCards(numOfExtraCardsForDesktop);
      setMoviesCardsNumToRender(cardsNumRenderForDesktop);
      if (isSearchTextSame || (lastNumShowed !== 'noSearch' && !isSearchTextSame)) {
        if (moviesCardsNumToRender > defaultValueLastNumCardsRenderForStorage && moviesCardsNumToRender % numOfExtraCardsForDesktop !== 0) {
          numCardsToRender = Math.floor(moviesCardsNumToRender / numOfExtraCardsForDesktop) * numOfExtraCardsForDesktop + numOfExtraCardsForDesktop;
        } else if (moviesCardsNumToRender % numOfExtraCardsForDesktop === 0) {
          numCardsToRender = moviesCardsNumToRender;
        } else {
          if (moviesCardsNumToRender < cardsNumRenderForDesktop) {
            numCardsToRender = cardsNumRenderForDesktop;
          } else {
            numCardsToRender = moviesCardsNumToRender;
          }
        }
      } else {
        numCardsToRender = cardsNumRenderForDesktop;
      }
      setMoviesCardsNumToRender(numCardsToRender);
    }
  };

  function checkSavedMovies() {
    if (!savedMoviesCards.length) {
      getSavedMoviesCards();
    }
  }

  function filterMoviesBySearchText(cardsList, numCardsToRender, isShort, setTextFiltered, setFiltered) {
    const textFilteredMoviesList = filterByText(cardsList, findMovieText);
    setTextFiltered(textFilteredMoviesList);
    filterMoviesByShort(numCardsToRender, isShort, setFiltered);
  }

  function filterMoviesByShort(numCardsToRender, isShort, setFiltered) {
    if (isShort) {
      const shortFiltered = filterByDuration(textFilteredMovies);
      getFilteredMovies(shortFiltered, numCardsToRender, setFiltered);
      setShortFilteredMoviesLength(shortFiltered.length);
      checkLoadMoreButtonActivity(shortFiltered.length);
    } else {
      getFilteredMovies(textFilteredMovies, numCardsToRender, setFiltered);
      setShortFilteredMoviesLength(textFilteredMovies.length);
      checkLoadMoreButtonActivity(textFilteredMovies.length);
    }
  }

  function getFilteredMovies(moviesList, numCardsToRender, setFiltered) {
    const filteredMovies = getFilteredItems(moviesList, numCardsToRender);
    setFiltered(filteredMovies);
  }

  function checkLoadMoreButtonActivity(filteredMoviesLength) {
    if (moviesCardsNumToRender < filteredMoviesLength) {
      toggleLoadMore(true);
    } else {
      toggleLoadMore(false);
    }
  }

  function toggleShortMovies(searchMovies) {
    searchMovies();
  }

  function handleToggleLike(card) {
    if (localStorage.getItem('likedMovies')) {
      const likedMovies = JSON.parse(localStorage.getItem('likedMovies'));
      const isLiked = likedMovies.some(id => parseInt(id, 10) === card.id);
      if (isLiked) {
        const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
        const selectedCard = savedMovies.find((savedMovie) => {
          return savedMovie.nameEN === card.nameEN;
        });
        handleCardDelete(selectedCard);
      } else {
        handleCardLike(card);
      }
    } else {
      handleCardLike(card);
    }
  }

  function saveCurrentSearchTextValue() {
    setPreviousFindMovieText(findMovieText);
    setIsSearchTextSame(true);
  }

  function toggleIsOpenPage() {
    setIsMoviesPageOpen(!isMoviesPageOpen);
  }

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

  function closeAllPopups() {
    setIsConfirmDelCardPopupOpen(false);
  }

  function handleConfirmDelCardClick(card) {
    setSelectedCardToDelete(card);
    setIsConfirmDelCardPopupOpen(true);
  }

  function hideErrorMessages() {
    setErrorRequestMessage('');
    setInfoRequestMessage('');
    setIsInfoMessageActive(false);
  }

  function handleConfirmDelCard() {
    handleCardDelete(selectedCardToDelete);
  }

  function togglePreloader(isActive) {
    setIsPreloaderActive(isActive);
  }

  function resetSearchMoviesResults() {
    clearLocalStorage();
    setMoviesCards([]);
    setTextFilteredMovies([]);
    setFilteredMovies([]);
    setPreviousFindMovieText('');
    setFindMovieText('');
    setIsShortMovies(false);
  }

  function handleSearchMovies() {
    hideErrorMessages();
    setPreviousFindMovieText(findMovieText);
    if (!isSearchTextValid(findMovieText)) {
      getErrorRequestMessage(errorSearchTextInValidMessage);
      return;
    }
    if (!isSearchTextSame) {
      setMoviesCardsNumToRender(defaultCardsNumRenderForMovies);
      checkWidth();
    } else {
      setMoviesCardsNumToRender(moviesCardsNumToRender);
    }
    checkWidth();
    if (typeof moviesCards === 'undefined' || !moviesCards.length) {
      getMoviesCards();
    }
    if (moviesCards) {
      filterMoviesBySearchText(moviesCards, moviesCardsNumToRender, isShortMovies, setTextFilteredMovies, setFilteredMovies);
    }
  }

  function toggleLoadMore(isActive) {
    setIsLoadMore(isActive);
  }

  function loadMoreCards() {
    setIsSearchTextSame(true);
    localStorage.setItem('lastNumShowedMovies', 'noSearch');
    if (moviesCardsNumToRender < shortFilteredMoviesLength) {
      toggleLoadMore(true);
      setMoviesCardsNumToRender((currentNumOfCards) => currentNumOfCards + numOfExtraCards);
    } else {
      toggleLoadMore(false);
    }
  }

  useEffect(() => {
    async function handleTokenCheck() {
      const isAuthorized = localStorage.getItem('isAuthorized');
      if (!isAuthorized) {
        return;
      }
      const isToken = await auth.checkToken();
      if (isAuthorized && isToken) {
        mainApi.getUserInfo().then((userData) => {
          setCurrentUserEmail(userData.email);
          if (checkIsFirstSignInLocalStorage()) {
            navigate("/", { replace: false });
          }
        }).catch((err) => {
          alert(`${err}
  Что-то пошло не так. Попробуйте войти снова.`);
        })
      }
    }
    handleTokenCheck();
    hideErrorMessages();
    const isAuthorized = localStorage.getItem('isAuthorized');
    if (isAuthorized) {
      getSavedMoviesCards();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (savedMoviesCards.length) {
      localStorage.setItem('savedMovies', JSON.stringify(savedMoviesCards));
    } else {
      localStorage.setItem('savedMovies', JSON.stringify([]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedMoviesCards, localStorage]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedMovies'));
    setSavedMovies(saved);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedMoviesCards, localStorage]);

  useEffect(() => {
    if (savedMoviesCards.length) {
      getLikedMoviesId(savedMoviesCards);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedMoviesCards]);

  useEffect(() => {
    if (textFilteredMovies.length && findMovieText) {
      hideErrorMessages();
      filterMoviesByShort(moviesCardsNumToRender, isShortMovies, setFilteredMovies);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textFilteredMovies]);

  useEffect(() => {
    if (textFilteredMovies.length && findMovieText) {
      filterMoviesByShort(moviesCardsNumToRender, isShortMovies, setFilteredMovies);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moviesCardsNumToRender]);

  useEffect(() => {
    if (moviesCards && moviesCards.length && !textFilteredMovies.length) {
      getErrorRequestMessage(errorNotFoundMessageText);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredMovies]);

  useEffect(() => {
    if (!isMoviesPageOpen) {
      configureLastNumShowedMovieslocalStorage(moviesCardsNumToRender);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMoviesPageOpen]);

  const isLogged = localStorage.getItem('isAuthorized') ? JSON.parse(localStorage.getItem('isAuthorized')) : false;

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentUserEmail.Provider value={currentUserEmail}>
        <Routes>
          <Route path="*" element={!isLogged ? <Navigate to="/signin" replace /> : <Navigate to="/404" replace />} />
          <Route path="/" element={<ProtectedRouteElement
            element={Main}
            loggedIn={isLogged}
            hideErrorMessages={hideErrorMessages}
          />} />
          <Route path="/movies" element={<ProtectedRouteElement
            element={Movies}
            loggedIn={isLogged}
            localStorageData={localStorageData}
            checkSavedMovies={checkSavedMovies}
            previousFindMovieText={previousFindMovieText}
            saveCurrentSearchTextValue={saveCurrentSearchTextValue}
            configureMovieslocalStorageData={configureMovieslocalStorageData}
            getLocalStorageForMovies={getLocalStorageForMovies}
            isMoviesPageOpen={isMoviesPageOpen}
            toggleIsOpenPage={toggleIsOpenPage}
            moviesCards={moviesCards}
            isFetching={isFetching}
            screenWidth={screenWidth}
            setScreenWidth={setScreenWidth}
            filterMoviesByShort={filterMoviesByShort}
            checkWidth={checkWidth}
            moviesCardsNumToRender={moviesCardsNumToRender}
            filteredMovies={filteredMovies}
            textFilteredMovies={textFilteredMovies}
            isPreloaderActive={isPreloaderActive}
            findMovieText={findMovieText}
            setFilteredMovies={setFilteredMovies}
            setFindMovieText={setFindMovieText}
            isShortMovies={isShortMovies}
            setIsShortMovies={setIsShortMovies}
            onSearch={handleSearchMovies}
            handleCardLike={handleToggleLike}
            isInfoMessage={isInfoMessageActive}
            errorMessageText={errorRequestMessage}
            hideErrorMessages={hideErrorMessages}
            isLoadMore={isLoadMore}
            onLoadMore={loadMoreCards}
            isSearchTextSame={isSearchTextSame}
            setIsSearchTextSame={setIsSearchTextSame}
            toggleShortMovies={toggleShortMovies}
          />} />
          <Route path="/saved-movies" element={<ProtectedRouteElement
            element={SavedMovies}
            loggedIn={isLogged}
            savedMoviesCards={savedMoviesCards}
            checkSavedMovies={checkSavedMovies}
            savedMovies={savedMovies}
            setSavedMovies={setSavedMovies}
            isPreloaderActive={isPreloaderActive}
            filteredSavedMovies={filteredSavedMovies}
            setFilteredSavedMovies={setFilteredSavedMovies}
            findSavedMovieText={findSavedMovieText}
            setFindSavedMovieText={setFindSavedMovieText}
            handleConfirmDelCardClick={handleConfirmDelCardClick}
            isShortMovies={isShortSavedMovies}
            setIsShortMovies={setIsShortSavedMovies}
            isInfoMessage={isInfoMessageActive}
            getErrorRequestMessage={getErrorRequestMessage}
            errorMessageText={errorRequestMessage}
            hideErrorMessages={hideErrorMessages}
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
            loggedIn={isLogged}
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
