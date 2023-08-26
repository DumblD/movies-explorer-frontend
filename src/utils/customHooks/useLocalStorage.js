import { useState } from 'react';

export function useLocalStorage() {
  const [localStorageData, setLocalStorageData] = useState({
    lastSearchMovies: '',
    isShortMovies: '',
    lastNumShowedMovies: '',
    lastSearchSavedMovies: '',
    isShortSavedMovies: '',
    likedMovies: [],
  });

  const setLikedMovieLocalStorage = (cardId) => {
    const movieId = String(cardId);
    let likedMoviesId;
    if (localStorage.getItem('likedMovies')) {
      const liked = JSON.parse(localStorage.getItem('likedMovies'));
      liked.push(movieId);
      localStorage.setItem('likedMovies', JSON.stringify(liked));
      likedMoviesId = liked.map((el) => {
        return el;
      });
    } else {
      const liked = [];
      liked.push(movieId);
      localStorage.setItem('likedMovies', JSON.stringify(liked));
      likedMoviesId = liked.map((el) => {
        return el;
      });
    }
    setLocalStorageData(likedMoviesId);
  }

  const deleteLikedMovieLocalStorage = (card) => {
    let likedMoviesId;
    if (localStorage.getItem('likedMovies')) {
      const liked = JSON.parse(localStorage.getItem('likedMovies'));
      const filmId = typeof card.id === 'number' ? card.id : card.movieId;
      const likedUpdated = liked.filter((el) => {
        return parseInt(el, 10) !== filmId;
      });
      localStorage.setItem('likedMovies', JSON.stringify(likedUpdated));
      likedMoviesId = liked.map((el) => {
        return el;
      });
      setLocalStorageData(likedMoviesId);
    }
  }

  function getLikedMoviesId(savedMovies) {
    if (savedMovies.length && (!localStorage.getItem('likedMovies') || !localStorage.getItem('likedMovies').length)) {
      let liked = [];
      savedMovies.forEach((movie) => {
        liked.push(movie.movieId);
      });
      localStorage.setItem('likedMovies', JSON.stringify(liked));
    } else {
      return;
    }
  }

/*   const setMoviesLiked = (movies) => {
    if (localStorage.getItem('likedMovies')) {
      const liked = JSON.parse(localStorage.getItem('likedMovies'));
      liked.forEach(likeItem => {
        const filter = movies.map((movie) => {
          if (movie.movieId === likeItem) {
            movie.like = true;
            return movie;
          }
          return movie;
        });
        return filter;
      });
    } else {
      return;
    }
  } */

/*   const setMoviesLiked = (movies) => {
    console.log(movies);
  } */

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
    setLocalStorageData([]);
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
    getLikedMoviesId,
  };
}
