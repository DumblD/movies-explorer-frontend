import React, { useEffect } from 'react';
import Header from './../Header/Header';
import SearchForm from './../SearchForm/SearchForm';
import MoviesCardList from './../MoviesCardList/MoviesCardList';
import LoadMoreButton from './../LoadMoreButton/LoadMoreButton';
import Footer from './../Footer/Footer';
import InfoToolTip from './../../components/InfoToolTip/InfoToolTip';
import { useLocalStorage } from './../../utils/customHooks/useLocalStorage';

function Movies({
  moviesCards,
  moviesCardsNumToRender,
  filterMoviesByShort,
  filteredMovies,
  textFilteredMovies,
  isPreloaderActive,
  findMovieText,
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
}) {
  const infoToolTipStyle = "page__info-tool-tip";
  const infoToolTipTextStyle = "page__info-tool-tip-text";
  const cardClassName = "movies-card";
  const isMoviesPage = true;
  const { localStorageData, configureMovieslocalStorageData, getLocalStorageForMovies } = useLocalStorage();

  // получаем данные из localStorage и записываем в переменную localStorage
  useEffect(() => {
    hideErrorMessages();
    getLocalStorageForMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // сохраняем данные в localStorage
  useEffect(() => {
    setFindMovieText(localStorageData.lastSearchMovies);
    setIsShortMovies(localStorageData.isShortMovies);
    console.log(moviesCards.length);
    if (!moviesCards.length) {
      console.log(moviesCards.length);
      onSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorageData]);

// записываем в localStorage состояние переключателя и актуальный поиска
  useEffect(() => {
    if (findMovieText) {
      configureMovieslocalStorageData(findMovieText, isShortMovies);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textFilteredMovies, isShortMovies]);

// фильтруем по клику на переключатель короткометражек
  useEffect(() => {
    if (textFilteredMovies.length && findMovieText && moviesCards.length) {
      hideErrorMessages();
      filterMoviesByShort();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textFilteredMovies, isShortMovies, moviesCards]);

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
          moviesCardsNumToRender={moviesCardsNumToRender}
          setIsSearchTextSame={setIsSearchTextSame}
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
