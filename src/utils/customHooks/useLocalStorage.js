import { useState } from 'react';

export function useLocalStorage() {
  const [localStorageData, setLocalStorageData] = useState({
    lastSearchMovies: '',
    isShortMovies: '',
    lastSearchSavedMovies: '',
    isShortSavedMovies: '',
  });

  const configureMovieslocalStorageData = (searchText, isShort) => {
    localStorage.setItem('lastSearchMovies', searchText);
    isShort ? localStorage.setItem('isShortMovies', 'true') :
      localStorage.setItem('isShortMovies', 'false');
  }

  const configureSavedMovieslocalStorageData = (searchText, isShort) => {
    localStorage.setItem('lastSearchSavedMovies', searchText);
    isShort ? localStorage.setItem('isShortSavedMovies', 'true') :
      localStorage.setItem('isShortSavedMovies', 'false');
  }

  const getLocalStorageForMovies = () => {
    const lastSearchMovies = localStorage.getItem('lastSearchMovies');
    const isShortMovies = localStorage.getItem('isShortMovies');
    let isShort;
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
    setLocalStorageData({ ...localStorageData, lastSearchMovies: lastSearchMovies, isShortMovies: isShort });
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
      localStorage.removeItem(localStorageData[key]);
    }
    localStorage.clear();
  }

  return {
    configureMovieslocalStorageData,
    configureSavedMovieslocalStorageData,
    localStorageData,
    getLocalStorageForMovies,
    getLocalStorageForSavedMovies,
    clearLocalStorage
  };
}
