import React, { useEffect, useState } from 'react';
import Header from './../Header/Header';
import SearchForm from './../SearchForm/SearchForm';
import MoviesCardList from './../MoviesCardList/MoviesCardList';
import LoadMoreButton from './../LoadMoreButton/LoadMoreButton';
import Footer from './../Footer/Footer';
import InfoToolTip from './../../components/InfoToolTip/InfoToolTip';
import { useLocalStorage } from './../../utils/customHooks/useLocalStorage';

function SavedMovies({
  cards,
  savedMoviesCardsNumToRender,
  setSavedMoviesCardsNumToRender,
  getSavedMoviesCards,
  isPreloaderActive,
  textFilteredSavedMovies,
  filteredSavedMovies,
  setFilteredSavedMovies,
  filterMoviesByShort,
  findSavedMovieText,
  setFindSavedMovieText,
  handleConfirmDelCardClick,
  isSearchTextSame,
  onSearch,
  isShortMovies,
  setIsShortMovies,
  isLoadMore,
  onLoadMore,
  setIsSearchTextSame,
  isInfoMessage,
  errorMessageText,
  hideErrorMessages,
  toggleShortMovies,
}) {
  const { getLikedMoviesId } = useLocalStorage();
  const isMoviesPage = false;
  const additionalMoviesCardsStyles = 'movies-cards_padding_changed';

  const infoToolTipStyle = "page__info-tool-tip";
  const infoToolTipTextStyle = errorMessageText.includes('нет сохраненных фильмов') ? 'page__info-tool-tip-text info-tool-tip__text_color_black' : 'page__info-tool-tip-text';
  const cardClassName = "movies-card";

  function toggleShort() {
    onSearch();
    console.log(textFilteredSavedMovies);
  }

  function filterByShort() {
    filterMoviesByShort(savedMoviesCardsNumToRender, isShortMovies, setFilteredSavedMovies);
  }

  function checkFilteredMoviesLength() {
    console.log(textFilteredSavedMovies.length);
    setSavedMoviesCardsNumToRender(textFilteredSavedMovies.length);
  }

  useEffect(() => {
    hideErrorMessages();
    setIsShortMovies(false);
    setFindSavedMovieText('');
    getSavedMoviesCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (cards.length) {
      getLikedMoviesId(cards);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards]);

  useEffect(() => {
    if (textFilteredSavedMovies.length && findSavedMovieText) {
      console.log('it IS');
      console.log(savedMoviesCardsNumToRender);
      filterMoviesByShort(savedMoviesCardsNumToRender, isShortMovies, setFilteredSavedMovies);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textFilteredSavedMovies]);

  useEffect(() => {
    if (textFilteredSavedMovies.length) {
      checkFilteredMoviesLength();
      console.log(savedMoviesCardsNumToRender);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textFilteredSavedMovies]);

  useEffect(() => {
    filterMoviesByShort(savedMoviesCardsNumToRender, isShortMovies, setFilteredSavedMovies);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedMoviesCardsNumToRender]);

/*   useEffect(() => {
    if (filteredMovies.length) {
      setMoviesCardsNumToRender(filteredMovies.length);
    }
    console.log(filteredMovies.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredMovies]); // moviesCards было */

  return (
    <div className="page__container">
      <Header />
      <main>
        <SearchForm
          findMovieText={findSavedMovieText}
          setFindMovieText={setFindSavedMovieText}
          isShortMovies={isShortMovies}
          setIsShortMovies={setIsShortMovies}
          onSearch={onSearch}
          textFilteredMovies={textFilteredSavedMovies}
          setIsSearchTextSame={setIsSearchTextSame}
          filteredMovies={filteredSavedMovies}
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
        {!isInfoMessage && <MoviesCardList isPreloaderActive={isPreloaderActive} cards={cards} onCardDelete={handleConfirmDelCardClick} isMoviesPage={isMoviesPage} cardClassName={cardClassName} additionalStyles={additionalMoviesCardsStyles} />}
        <LoadMoreButton isInfoMessage={isInfoMessage} isActive={false} onLoadMore={onLoadMore} />
      </main>
      <Footer />
    </div>
  );
}

export default SavedMovies;
