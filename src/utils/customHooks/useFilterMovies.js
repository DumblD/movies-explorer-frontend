/* import { useState, useEffect } from 'react';
import {
  mobileWidthMediaQuery,
  tabletWidthMediaQuery,
  desktopWidthMediaQuery,
  shortMovieDuration,
} from '../../utils/constants/constants';

export function useFilterMovies() {
  const [moviesCards, setMoviesCards] = useState([]);
  const [savedMoviesCards, setSavedMoviesCards] = useState([]);
  const [moviesCardsNumToRender, setMoviesCardsNumToRender] = useState(0);
  const [numOfExtraCards, setNumOfExtraCards] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isShortMovies, setIsShortMovies] = useState(false);

  const [textFilteredMovies, setTextFilteredMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

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

  const filterMoviesByShort = () => {
    if (isShortMovies) {
      const shortFiltered = textFilteredMovies.filter((cardElement) => {
        return cardElement.duration <= shortMovieDuration;
      });
      getFilteredMovies(shortFiltered);
    } else {
      getFilteredMovies(textFilteredMovies);
    }
  }

  const getFilteredMovies = (moviesList) => {
    const filteredMovies = moviesList.filter((card, index) => {
      return index < moviesCardsNumToRender;
    });
    setFilteredMovies(filteredMovies);
  }

// ------------------------

useEffect(() => {
  if (textFilteredMovies.length) {
    filterMoviesByShort();
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [textFilteredMovies, isShortMovies]);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth);
    });
    checkWidth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenWidth, moviesCardsNumToRender]);

  return {
    checkWidth,
    moviesCards,
    textFilteredMovies,
    setTextFilteredMovies,
    setMoviesCards,
    savedMoviesCards,
    setSavedMoviesCards,
    moviesCardsNumToRender,
    setMoviesCardsNumToRender,
    isShortMovies,
    setIsShortMovies,
    filteredMovies,
    filterMoviesByShort,
  };
}
 */
