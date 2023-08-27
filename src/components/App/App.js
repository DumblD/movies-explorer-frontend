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
  errorNotFoundOrEmpty,
  errorSearchTextInValidMessage,
  errorUpdateInfoRequestMessageText,
  infoUpdateInfoRequestMessageText,
  errorLoginInfoRequestMessageText,
  errorRegisterInfoRequestMessageText,
  isSearchTextValid,
  searchFilterParams,
  sortMovieDataAddLike,
} from '../../utils/constants/constants';
/* import { useFilterMovies } from '../../utils/customHooks/useFilterMovies'; */
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { CurrentUserEmail } from '../../contexts/CurrentUserEmail';
import { useLocalStorage } from './../../utils/customHooks/useLocalStorage';

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
  const [findSavedMovieText, setFindSavedMovieText] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  const [moviesCards, setMoviesCards] = useState([]);
  const [savedMoviesCards, setSavedMoviesCards] = useState([]);
  const [moviesCardsNumToRender, setMoviesCardsNumToRender] = useState(5);
  const [savedMoviesCardsNumToRender, setSavedMoviesCardsNumToRender] = useState(0);
  const [numOfExtraCards, setNumOfExtraCards] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [isShortSavedMovies, setIsShortSavedMovies] = useState(false);
  const [isPreviousShortMovies, setIsPreviousShortMovies] = useState(false);

  const [isSearchTextSame, setIsSearchTextSame] = useState('');
  const [previousFindMovieText, setPreviousFindMovieText] = useState('');
  const [shortFilteredMoviesLength, setShortFilteredMoviesLength] = useState(0);

  const [textFilteredMovies, setTextFilteredMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [textFilteredSavedMovies, setTextFilteredSavedMovies] = useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
  const [isMoviesPageOpen, setIsMoviesPageOpen] = useState(false);
  const { localStorageData, configureLastNumShowedMovieslocalStorage, configureMovieslocalStorageData, getLocalStorageForMovies, clearLocalStorage, setLikedMovieLocalStorage, deleteLikedMovieLocalStorage } = useLocalStorage();

  const navigate = useNavigate();

  function handleRequest(request) {
    setIsFetching(true);
    togglePreloader(true);
    request()
      .catch((err) => {
        getErrorRequestMessage(errorNotFoundOrEmpty);
        console.log(err);
      })
      .finally(() => {
        togglePreloader(false);
        setIsFetching(false);
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
          console.log(data.data);
          if (data) {
            setSavedMoviesCards(data.data);
          } else {
            return;
          }
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

  function handleCardLike(card) {
    const ownId = currentUser._id;
    const newMovieCard = sortMovieDataAddLike(card, ownId);
    mainApi.addNewSavedMovie(newMovieCard)
      .then((newCard) => {
        console.log(newCard);
        const {
          ...newMovieCard
        } = newCard;
        const updatedSavedMoviesCards = savedMoviesCards.map((cardElement) => {
          return cardElement;
        });
        newMovieCard.movieId = newMovieCard._id;
        updatedSavedMoviesCards.push(newMovieCard);
        setSavedMoviesCards(updatedSavedMoviesCards);
        setLikedMovieLocalStorage(newCard.movieId);
      })
      .catch(console.error);
  }

  function handleCardDelete(card) {
    const deleteId = typeof card.movieId === 'string' ? card.movieId : card._id;
    return mainApi.deleteSavedMovie(deleteId)
      .then(() => {
        const updatedSavedMoviesCards = savedMoviesCards.filter((cardElement) => {
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
    const lastNumShowed = localStorage.getItem('lastNumShowedMovies');
    let numCardsToRender;
    if (mobileWidthMediaQuery.matches && !tabletWidthMediaQuery.matches) {
      console.log('mobile matches');
      setNumOfExtraCards(2);
      if (moviesCardsNumToRender > 5) {
        if (isSearchTextSame || (lastNumShowed !== 'noSearch' && !isSearchTextSame)) {
          numCardsToRender = moviesCardsNumToRender;
        }
      } else {
        numCardsToRender = 5;
      }
      setMoviesCardsNumToRender(numCardsToRender);
    } else if (!mobileWidthMediaQuery.matches && tabletWidthMediaQuery && !desktopWidthMediaQuery.matches) {
      console.log('tablet matches');
      setNumOfExtraCards(2);
      if (moviesCardsNumToRender > 8) {
        if (isSearchTextSame || (lastNumShowed !== 'noSearch' && !isSearchTextSame)) {
          numCardsToRender = moviesCardsNumToRender - moviesCardsNumToRender % 2;
        }
      } else {
        numCardsToRender = 8;
      }
      setMoviesCardsNumToRender(numCardsToRender);
    } else if (desktopWidthMediaQuery.matches) {
      console.log('1280 matches');
      console.log(moviesCardsNumToRender);
      setNumOfExtraCards(3);
      setMoviesCardsNumToRender(12);
      console.log(isSearchTextSame);
      if (isSearchTextSame || (lastNumShowed !== 'noSearch' && !isSearchTextSame)) {
      console.log(moviesCardsNumToRender);
        if (moviesCardsNumToRender > 12 && moviesCardsNumToRender % 3 !== 0) {
          numCardsToRender = Math.floor(moviesCardsNumToRender / 3) * 3 + 3;
        } else if (moviesCardsNumToRender % 3 === 0) {
          console.log('/3');
          numCardsToRender = moviesCardsNumToRender;
        } else {
          console.log(isSearchTextSame);
          console.log(moviesCardsNumToRender);
          if (moviesCardsNumToRender < 12) {
            numCardsToRender = 12;
          } else {
            numCardsToRender = moviesCardsNumToRender;
          }
        }
      } else {
        numCardsToRender = 12;
        console.log('default 12');
      }
      setMoviesCardsNumToRender(numCardsToRender);
    }
  };

  function filterByText(moviesList) {
    const textFilteredMoviesList = moviesList.map((cardElement) => {
      const isInclude = searchFilterParams.some((param) => {
        return cardElement[param].toLowerCase().includes(findMovieText);
      });
      return isInclude ? cardElement : null;
    }).filter((el) => {
      return el !== null;
    });
    return textFilteredMoviesList;
  }

  function filterByDuration(moviesList) {
    const shortFiltered = moviesList.filter((cardElement) => {
      return cardElement.duration <= shortMovieDuration;
    });
    return shortFiltered;
  }

  function getFilteredItems(moviesList, numCardsToRender) {
    const filteredMovies = moviesList.filter((card, index) => {
      return index < numCardsToRender;
    });
    return filteredMovies;
  }

  function filterMoviesBySearchText(cardsList, numCardsToRender, isShort, setTextFiltered, setFiltered) {
    const textFilteredMoviesList = filterByText(cardsList);
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
    console.log(moviesCardsNumToRender);
    if (moviesCardsNumToRender < filteredMoviesLength) {
      toggleLoadMore(true);
    } else {
      toggleLoadMore(false);
    }
  }

/*   function toggleShortMovies(searchMovies) {
    console.log(isSearchTextSame);
    console.log(filteredMovies.length);
    console.log(textFilteredMovies);
    console.log(textFilteredMovies.length);
    if (textFilteredMovies.length && findMovieText && isSearchTextSame) {
      console.log(moviesCardsNumToRender);
      filterMoviesByShort();
    } else if (filteredMovies.length && findMovieText && !isSearchTextSame) {
      searchMovies();
    }
  } */

  function toggleShortMovies(searchMovies) {
    console.log(isSearchTextSame);
    console.log(filteredMovies.length);
    console.log(textFilteredMovies);
    console.log(textFilteredMovies.length);
    searchMovies();
  }

// ------------------------

/* function setMoviesLiked() {
  if (localStorage.getItem('likedMovies') && localStorage.getItem('likedMovies').length) {
    let updatedMoviesLikes;
    const liked = JSON.parse(localStorage.getItem('likedMovies'));
    liked.forEach(likeItem => {
      const filter = moviesCards.map((movie) => {
        if (movie.id === parseInt(likeItem, 10)) {
          movie.like = true;
          return movie;
        }
        return movie;
      });
      updatedMoviesLikes = filter.map((item) => {
        return item;
      });
    });
    setUpdatedMoviesCards(updatedMoviesLikes);
  } else {
    return;
  }
} */

  function handleToggleLike(card) {
    if (localStorage.getItem('likedMovies')) {
      const likedMovies = JSON.parse(localStorage.getItem('likedMovies'));
      const isLiked = likedMovies.some(id => parseInt(id, 10) === card.id);
      if (isLiked) {
        const selectedCard = savedMoviesCards.filter((savedMovie) => {
          return savedMovie.nameEN === card.nameEN;
        });
        setSelectedCardToDelete(selectedCard);
        handleConfirmDelCard();
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
/*
  function handleCardLike(card) {
    handleCardLike(card); */
    /* // Api request -> returns new card with updated like status
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
/*   } */

  /* function comparePreviousLastSearchMoviesText(inputValue) {
    const isSame = previousFindMovieText === inputValue;
    setIsTextSearchSame(isSame);
  } */

  function hideErrorMessages() {
    setErrorRequestMessage('');
    setInfoRequestMessage('');
    setIsInfoMessageActive(false);
  }

/*   function handleCardDelete(card) {
    handleCardLike(card);
    closeAllPopups();
  } */

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
    clearLocalStorage();
    setMoviesCards([]);
    setTextFilteredMovies([]);
    setFilteredMovies([]);
    setPreviousFindMovieText('');
    setFindMovieText('');
    setIsShortMovies(false);
  }

  function handleSearchMovies() {
    // Api request
    hideErrorMessages();
    setPreviousFindMovieText(findMovieText);
    if (!isSearchTextValid(findMovieText)){
      getErrorRequestMessage(errorSearchTextInValidMessage);
      return;
    }
    if (!isSearchTextSame) {
      setMoviesCardsNumToRender(5);
      checkWidth();
      console.log('not same');
    } else {
      console.log('the same');
      setMoviesCardsNumToRender(moviesCardsNumToRender);
    }
    console.log(numOfExtraCards);
    checkWidth();
    if (typeof moviesCards === 'undefined' || !moviesCards.length) {
      getMoviesCards();
    }
    if (moviesCards) {
      filterMoviesBySearchText(moviesCards, moviesCardsNumToRender, isShortMovies, setTextFilteredMovies, setFilteredMovies);
    }
/*     if (!moviesCards.length && findMovieText) {
      getMoviesCards();
    } else if (moviesCards.length && findMovieText) {
      getMoviesCardsToRender(moviesCards);
    } */
    // ...
  }

  function handleSearchSavedMovies() {
    // function filters movies on front
    // Api request
    hideErrorMessages();
    if (!isSearchTextValid(findMovieText)){
      getErrorRequestMessage(errorSearchTextInValidMessage);
      return;
    }
    if (typeof savedMoviesCards === 'undefined' || !savedMoviesCards.length) {
      getSavedMoviesCards();
    }
    if (savedMoviesCards.length) {
      filterMoviesBySearchText(savedMoviesCards, savedMoviesCardsNumToRender, isShortSavedMovies, setTextFilteredSavedMovies, setFilteredSavedMovies); // ------------------------------------поправить - второй аргумент
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
    console.log(currentUser._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

/*   useEffect(() => {
    if (filteredMovies.length) {
      checkWidth();
    }
    console.log(filteredMovies.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textFilteredMovies, filteredMovies, moviesCards]); */

  // фильтруем, когда карточки загрузились --------------------------------------------------- это раскомитить
  useEffect(() => {
    if (textFilteredMovies.length && findMovieText) {
      console.log(findMovieText);
      hideErrorMessages();
      filterMoviesByShort(moviesCardsNumToRender, isShortMovies, setFilteredMovies);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textFilteredMovies]);

 /*    useEffect(() => {
      window.addEventListener('resize', () => {
        setScreenWidth(window.innerWidth);
      });
      checkWidth();
      console.log(moviesCardsNumToRender);
      filterMoviesByShort();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [screenWidth, moviesCardsNumToRender]); */

    useEffect(() => {
      if (textFilteredMovies.length && findMovieText) {
        console.log('it IS');
        console.log(moviesCardsNumToRender);
        filterMoviesByShort(moviesCardsNumToRender, isShortMovies, setFilteredMovies);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [moviesCardsNumToRender]);

/*     useEffect(() => {
      checkWidth();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [moviesCardsNumToRender]); */

    useEffect(() => {
      if (moviesCards && moviesCards.length && !textFilteredMovies.length) {
        console.log(123);
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

  useEffect(() => {
    setIsPreviousShortMovies(!isShortMovies);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShortMovies]);

/*   useEffect(() => {
    setMoviesCards(updatedMoviesCards);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedMoviesCards]); */

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
            localStorageData={localStorageData}
            previousFindMovieText={previousFindMovieText}
            setPreviousFindMovieText={setPreviousFindMovieText}
            saveCurrentSearchTextValue={saveCurrentSearchTextValue}
            configureMovieslocalStorageData={configureMovieslocalStorageData}
            getLocalStorageForMovies={getLocalStorageForMovies}
            isMoviesPageOpen={isMoviesPageOpen}
            toggleIsOpenPage={toggleIsOpenPage}
            moviesCards={moviesCards}
            setMoviesCards={setMoviesCards}
            isFetching={isFetching}
            screenWidth={screenWidth}
            setScreenWidth={setScreenWidth}
            filterMoviesByShort={filterMoviesByShort}
            checkWidth={checkWidth}
            moviesCardsNumToRender={moviesCardsNumToRender}
            setMoviesCardsNumToRender={setMoviesCardsNumToRender}
            filteredMovies={filteredMovies}
            setTextFilteredMovies={setTextFilteredMovies}
            setFilteredMovies={setFilteredMovies}
            textFilteredMovies={textFilteredMovies}
            isPreloaderActive={isPreloaderActive}
            findMovieText={findMovieText}
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
            loggedIn={loggedIn}
            cards={savedMoviesCards}
            savedMoviesCardsNumToRender={savedMoviesCardsNumToRender}
            setSavedMoviesCardsNumToRender={setSavedMoviesCardsNumToRender}
            previousFindMovieText={previousFindMovieText}
            setPreviousFindMovieText={setPreviousFindMovieText}
            textFilteredSavedMovies={textFilteredSavedMovies}
            setTextFilteredMovies={setTextFilteredSavedMovies}
            filteredMovies={filteredSavedMovies}
            setFilteredSavedMovies={setFilteredSavedMovies}
            filterMoviesByShort={filterMoviesByShort}
            getSavedMoviesCards={getSavedMoviesCards}
            isPreloaderActive={isPreloaderActive}
            findSavedMovieText={findSavedMovieText}
            setFindSavedMovieText={setFindSavedMovieText}
            handleConfirmDelCardClick={handleConfirmDelCardClick}
            onSearch={handleSearchSavedMovies}
            isShortMovies={isShortSavedMovies}
            setIsShortMovies={setIsShortSavedMovies}
            isLoadMore={isLoadMore}
            onLoadMore={loadMoreSavedCards}
            isSearchTextSame={isSearchTextSame}
            setIsSearchTextSame={setIsSearchTextSame}
            isInfoMessage={isInfoMessageActive}
            errorMessageText={errorRequestMessage}
            hideErrorMessages={hideErrorMessages}
            toggleShortMovies={toggleShortMovies}
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
