/* import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { mobileWidthMediaQuery, tabletWidthMediaQuery, desktopWidthMediaQuery } from '../../utils/constants/constants';

export function useResize() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [moviesCardsNumToRender, setMoviesCardsNumToRender] = useState(0);
  const [cardsNumInRow, setCardsNumInRow] = useState(0);
  const [cardsNumOfRows, setCardsNumOfRows] = useState(0);
  const[numOfExtraCards, setNumOfExtraCards] = useState(0);
  const [moviesCards, setMoviesCards] = useState([]);
  const [moviesCardsToRender, setMoviesCardsToRender] = useState([]);

  const checkWidth = (ev) => {
    if (mobileWidthMediaQuery.matches && !tabletWidthMediaQuery.matches) {
      let numToRender = 5;
      setCardsNumInRow(1);
      setCardsNumOfRows(5);
      setNumOfExtraCards(2);
      setNumOfExtraCards(2);
      if (moviesCardsToRender.length > 5) {
        numToRender = moviesCardsToRender.length;
        setMoviesCardsNumToRender(numToRender);
      } else {
        setMoviesCardsNumToRender(numToRender);
      }
    } else if (!mobileWidthMediaQuery.matches && tabletWidthMediaQuery && !desktopWidthMediaQuery.matches) {
      let numToRender = 8;
      setCardsNumInRow(2);
      setCardsNumOfRows(4);
      setNumOfExtraCards(2);
      setNumOfExtraCards(2);
      setMoviesCardsNumToRender(numToRender);
    } else if (desktopWidthMediaQuery.matches) {
      let numToRender = 12;
      setCardsNumInRow(3);
      setCardsNumOfRows(4);
      setNumOfExtraCards(3);
      setNumOfExtraCards(3);
      setMoviesCardsNumToRender(numToRender);
    }
  };

  useEffect(() => {
    checkWidth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    useEffect(() => {
      setScreenWidth(window.innerWidth);
      window.addEventListener('resize', checkWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [screenWidth]);

    return { moviesCards, setMoviesCards, moviesCardsNumToRender, moviesCardsToRender, setMoviesCardsToRender, cardsNumInRow, cardsNumOfRows, numOfExtraCards, setMoviesCardsNumToRender };
} */
