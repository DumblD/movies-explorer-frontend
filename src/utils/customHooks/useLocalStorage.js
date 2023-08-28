import { useState } from 'react';

export function useLocalStorage() {
  const [localStorageData, setLocalStorageData] = useState({
    lastSearchMovies: '',
    isShortMovies: '',
    lastNumShowedMovies: '',
    lastSearchSavedMovies: '',
    isShortSavedMovies: '',
    likedMovies: '[]',
    savedMovies: '[]',
    isFirstLogged: '',
  });

  const getSavedMoviesLocalStorage = () => {
    if (localStorage.getItem('savedMovies')) {
      const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
      return savedMovies;
    }
  }

  const checkIsFirstSignInLocalStorage = () => {
    if (!localStorage.getItem('isFirstLogged')) {
      return true;
    }
    return false;
  }

  const setLikedMovieLocalStorage = (cardId) => {
    if (localStorage.getItem('likedMovies')) {
      const liked = JSON.parse(localStorage.getItem('likedMovies'));
      liked.push(cardId);
      localStorage.setItem('likedMovies', JSON.stringify(liked));
    } else {
      const liked = [];
      liked.push(cardId);
      localStorage.setItem('likedMovies', JSON.stringify(liked));
    }
  }

  const deleteLikedMovieLocalStorage = (card) => {
    if (localStorage.getItem('likedMovies')) {
      const liked = JSON.parse(localStorage.getItem('likedMovies'));
      const filmId = typeof card.id === 'number' ? card.id : card.movieId;
      const likedUpdated = liked.filter((el) => {
        return parseInt(el, 10) !== filmId;
      });
      localStorage.setItem('likedMovies', JSON.stringify(likedUpdated));
    }
  }

  const getLikedMoviesId = (savedMovies) => {
    if (savedMovies.length) {
      let liked = [];
      savedMovies.forEach((movie) => {
        liked.push(typeof movie.movieId === 'number' ? movie.movieId : movie.id);
      });
      localStorage.setItem('likedMovies', JSON.stringify(liked));
    } else {
      return;
    }
  }

  const configureMovieslocalStorageData = (searchText, isShort) => {
    localStorage.setItem('lastSearchMovies', searchText);
    isShort ? localStorage.setItem('isShortMovies', 'true') :
      localStorage.setItem('isShortMovies', 'false');
  }

  const configureLastNumShowedMovieslocalStorage = (showedNum) => {
    localStorage.setItem('lastNumShowedMovies', showedNum);
    setLocalStorageData({...localStorageData, lastNumShowedMovies: showedNum});
  }

  const configureSavedMovieslocalStorageData = (searchText, isShort) => {
    localStorage.setItem('lastSearchSavedMovies', searchText);
    isShort ? localStorage.setItem('isShortSavedMovies', 'true') :
      localStorage.setItem('isShortSavedMovies', 'false');
  }

  const getLocalStorageForMovies = () => {
    const lastSearchMovies = localStorage.getItem('lastSearchMovies');
    const isShortMovies = localStorage.getItem('isShortMovies');
    const lastNumShowedMovies = localStorage.getItem('lastNumShowedMovies');
    let isShort;
    let lastNumShowed;
    if (!lastSearchMovies) {
      return;
    } else if (!isShortMovies) {
      isShort = false;
    } else if (isShortMovies) {
      if (isShortMovies === 'true') {
        isShort = true;
      } else if (isShortMovies === 'false') {
        isShort = false;
      }
    }
    if (lastNumShowedMovies) {
      lastNumShowed = parseInt(lastNumShowedMovies, 10);
    } else {
      lastNumShowed = 5;
    }
    setLocalStorageData({ ...localStorageData, lastSearchMovies: lastSearchMovies, isShortMovies: isShort, lastNumShowedMovies: lastNumShowed});
  }

  const getLocalStorageForSavedMovies = () => {
    const lastSearchSavedMovies = localStorage.getItem('lastSearchSavedMovies');
    const isShortSavedMovies = localStorage.getItem('isShortSavedMovies');
    let isShort;
    if (!lastSearchSavedMovies) {
      return;
    } else if (!isShortSavedMovies) {
      isShort = false;
    } else if (isShortSavedMovies) {
      if (isShortSavedMovies === 'true') {
        isShort = true;
      } else if (isShortSavedMovies === 'false') {
        isShort = false;
      }
    }
    setLocalStorageData({ ...localStorageData, lastSearchSavedMovies: lastSearchSavedMovies, isShortSavedMovies: isShort });
  }

  const clearLocalStorage = () => {
    for (const key in localStorageData) {
      localStorage.removeItem(`${localStorageData[key]}`);
    }
    localStorage.clear();
  }

  return {
    configureMovieslocalStorageData,
    configureSavedMovieslocalStorageData,
    localStorageData,
    getLocalStorageForMovies,
    getLocalStorageForSavedMovies,
    configureLastNumShowedMovieslocalStorage,
    clearLocalStorage,
    setLikedMovieLocalStorage,
    deleteLikedMovieLocalStorage,
    checkIsFirstSignInLocalStorage,
    getSavedMoviesLocalStorage,
    getLikedMoviesId,
  };
}
