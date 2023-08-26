import React, { useEffect } from 'react';
import Header from './../Header/Header';
import SearchForm from './../SearchForm/SearchForm';
import MoviesCardList from './../MoviesCardList/MoviesCardList';
import LoadMoreButton from './../LoadMoreButton/LoadMoreButton';
import Footer from './../Footer/Footer';
import InfoToolTip from './../../components/InfoToolTip/InfoToolTip';

function Movies({
  localStorageData,
  previousFindMovieText,
  setPreviousFindMovieText,
  saveCurrentSearchTextValue,
  configureMovieslocalStorageData,
  getLocalStorageForMovies,
  isMoviesPageOpen,
  toggleIsOpenPage,
  moviesCards,
  setMoviesCardsFirstsLoad,
  isFetching,
  screenWidth,
  setScreenWidth,
  filterMoviesByShort,
  checkWidth,
  moviesCardsNumToRender,
  setMoviesCardsNumToRender,
  filteredMovies,
  textFilteredMovies,
  isPreloaderActive,
  findMovieText,
  setTextFilteredMovies,
  setFilteredMovies,
  setFindMovieText,
  isShortMovies,
  setIsShortMovies,
  onSearch,
  handleCardLike,
  isInfoMessage,
  errorMessageText,
  hideErrorMessages,
  isLoadMore,
  onLoadMore,
  isSearchTextSame,
  setIsSearchTextSame,
  toggleShortMovies,
}) {
  const infoToolTipStyle = "page__info-tool-tip";
  const infoToolTipTextStyle = "page__info-tool-tip-text";
  const cardClassName = "movies-card";
  const isMoviesPage = true;

  function toggleShort() {
    toggleShortMovies(onSearch);
  }

  function filterByShort() {
    filterMoviesByShort(moviesCardsNumToRender, isShortMovies, setFilteredMovies);
  }

  useEffect(() => {
    return () => {
      toggleIsOpenPage();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMoviesPageOpen]);

  // получаем данные из localStorage и записываем в переменную localStorage
  useEffect(() => {
    toggleIsOpenPage();
    hideErrorMessages();
    getLocalStorageForMovies();
    console.log(filteredMovies.length);
    console.log(textFilteredMovies.length);
    console.log(isSearchTextSame);
    console.log(localStorageData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (localStorageData.lastSearchMovies) {
      onSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorageData]);

  // сохраняем данные на страницу
  useEffect(() => {
    console.log(localStorageData);
    if (localStorageData.lastSearchMovies) {
      setFindMovieText(localStorageData.lastSearchMovies);
      saveCurrentSearchTextValue();
      console.log(isShortMovies);
      console.log(localStorageData.isShortMovies);
      console.log(typeof localStorageData.isShortMovies);
      setIsShortMovies(localStorageData.isShortMovies);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorageData, isFetching]);

/*   useEffect(() => {
    if (moviesCardsFirstsLoad) {
      setMoviesLiked(moviesCards);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moviesCardsFirstsLoad]); */

  useEffect(() => {
    if (findMovieText && !isFetching) {
      onSearch();
    }
    console.log(moviesCards);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching, moviesCards]);

  useEffect(() => {
    if (findMovieText && moviesCards.length) {
      onSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previousFindMovieText]);

/*   useEffect(() => {
    if (findMovieText) {
      filterMoviesByShort();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textFilteredMovies]); */

// записываем в localStorage состояние переключателя и актуальный поиска
// именно тогда, когда происходит запрос
  useEffect(() => {
    if (findMovieText) {
      configureMovieslocalStorageData(findMovieText, isShortMovies);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textFilteredMovies, isShortMovies]);

  // -----------------------------------

  useEffect(() => {
    if (filteredMovies.length && findMovieText) {
      checkWidth();
    }
    console.log(textFilteredMovies);
    console.log(textFilteredMovies.length);
    console.log(filteredMovies.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textFilteredMovies, filteredMovies, moviesCards]); // moviesCards было

  useEffect(() => {
    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth);
    });
    checkWidth();
    console.log(moviesCardsNumToRender);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenWidth]);

  useEffect(() => {
    filterMoviesByShort(moviesCardsNumToRender, isShortMovies, setFilteredMovies);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moviesCardsNumToRender]);

  useEffect(() => {
    checkWidth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moviesCardsNumToRender]);

  useEffect(() => {
    if (findMovieText) {
      if (!isSearchTextSame) {
        localStorage.setItem('lastNumShowedMovies', 'noSearch');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [findMovieText]);

  useEffect(() => {
    setIsSearchTextSame(previousFindMovieText === findMovieText);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [findMovieText]);

  return (
    <div className="page__container">
      <Header />
      <main>
        <SearchForm
          findMovieText={findMovieText}
          setFindMovieText={setFindMovieText}
          isShortMovies={isShortMovies}
          setIsShortMovies={setIsShortMovies}
          onSearch={onSearch}
          textFilteredMovies={textFilteredMovies}
          setIsSearchTextSame={setIsSearchTextSame}
          filteredMovies={filteredMovies}
          isSearchTextSame={isSearchTextSame}
          filterByShort={filterByShort}
          toggleShortFilms={toggleShort}
        />
        {isInfoMessage &&
          <InfoToolTip
            additionalInfoClassStyles={infoToolTipStyle}
            additionalInfotextStyles={infoToolTipTextStyle}
            infoMessage={errorMessageText}
          />}
        {!isInfoMessage && <MoviesCardList isPreloaderActive={isPreloaderActive} cards={filteredMovies} onCardLike={handleCardLike} cardClassName={cardClassName} isMoviesPage={isMoviesPage} />}
        <LoadMoreButton isErrorMessage={isInfoMessage} isActive={isLoadMore} onLoadMore={onLoadMore} />
      </main>
      <Footer />
    </div>
  );
}

export default Movies;
