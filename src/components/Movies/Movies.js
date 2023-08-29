import React, { useEffect } from 'react';
import Header from './../Header/Header';
import SearchForm from './../SearchForm/SearchForm';
import MoviesCardList from './../MoviesCardList/MoviesCardList';
import LoadMoreButton from './../LoadMoreButton/LoadMoreButton';
import Footer from './../Footer/Footer';
import InfoToolTip from './../../components/InfoToolTip/InfoToolTip';
import SavedMovies from '../SavedMovies/SavedMovies';

function Movies({
  localStorageData,
  checkSavedMovies,
  previousFindMovieText,
  saveCurrentSearchTextValue,
  configureMovieslocalStorageData,
  getLocalStorageForMovies,
  isMoviesPageOpen,
  toggleIsOpenPage,
  moviesCards,
  isFetching,
  screenWidth,
  setScreenWidth,
  filterMoviesByShort,
  checkWidth,
  moviesCardsNumToRender,
  filteredMovies,
  textFilteredMovies,
  isPreloaderActive,
  findMovieText,
  findSavedMovieText,
  setFilteredMovies,
  setFindMovieText,
  isShortMovies,
  setIsShortMovies,
  onSearch,
  handleCardLike,
  isInfoMessage,
  errorMessageText,
  getErrorRequestMessage,
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

  function handleScreenWidth() {
    setScreenWidth(window.innerWidth);
  }

  useEffect(() => {
    return () => {
      toggleIsOpenPage();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMoviesPageOpen]);

  useEffect(() => {
    checkSavedMovies();
    toggleIsOpenPage();
    hideErrorMessages();
    getLocalStorageForMovies();
    const searchText = localStorage.getItem('lastSearchMovies');
    const isShort = JSON.parse(localStorage.getItem('isShortMovies'));
    if (searchText) {
      setFindMovieText(searchText);
      saveCurrentSearchTextValue();
      setIsShortMovies(isShort);
      onSearch();
    }
    window.addEventListener('resize', handleScreenWidth);
    return () => window.removeEventListener('resize', handleScreenWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (localStorage.getItem('lastSearchMovies')) {
      onSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorageData]);

  useEffect(() => {
    if (localStorageData.lastSearchMovies) {
      setFindMovieText(localStorageData.lastSearchMovies);
      saveCurrentSearchTextValue();
      setIsShortMovies(localStorageData.isShortMovies);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorageData, isFetching]);

  useEffect(() => {
    checkWidth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenWidth]);

  useEffect(() => {
    if (!findMovieText && !isFetching) {
      hideErrorMessages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SavedMovies]);

  useEffect(() => {
    if (findMovieText && !isFetching) {
      onSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching, moviesCards]);

  useEffect(() => {
    if (findMovieText && moviesCards.length) {
      hideErrorMessages();
      onSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previousFindMovieText]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textFilteredMovies, filteredMovies, moviesCards]); // moviesCards было

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

  useEffect(() => {
    if (isSearchTextSame && findMovieText) {
      filterByShort();
    } else if (!isSearchTextSame && findMovieText) {
      toggleShort();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShortMovies]);

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
          isMoviePage={isMoviesPage}
          hideErrorMessages={hideErrorMessages}
          getErrorRequestMessage={getErrorRequestMessage}
          findSavedMovieText={findSavedMovieText}
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
