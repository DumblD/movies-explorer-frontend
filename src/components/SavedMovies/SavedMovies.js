import React, { useEffect } from 'react';
import Header from './../Header/Header';
import SearchForm from './../SearchForm/SearchForm';
import MoviesCardList from './../MoviesCardList/MoviesCardList';
import Footer from './../Footer/Footer';
import InfoToolTip from './../../components/InfoToolTip/InfoToolTip';
import {
  isSearchTextValid,
  errorSearchTextInValidMessage,
  filterMovies,
 } from '../../utils/constants/constants';

function SavedMovies({
  savedMoviesCards,
  checkSavedMovies,
  savedMovies,
  setSavedMovies,
  isPreloaderActive,
  filteredSavedMovies,
  setFilteredSavedMovies,
  findSavedMovieText,
  setFindSavedMovieText,
  handleConfirmDelCardClick,
  isShortMovies,
  setIsShortMovies,
  isInfoMessage,
  getErrorRequestMessage,
  errorMessageText,
  hideErrorMessages,
}) {
  const isMoviesPage = false;
  const additionalMoviesCardsStyles = 'movies-cards_padding_changed';
  const additionalFooterStyles = 'footer_padding_changed';
  const infoToolTipStyle = "page__info-tool-tip";
  const infoToolTipTextStyle = errorMessageText.includes('нет сохраненных фильмов') ? 'page__info-tool-tip-text info-tool-tip__text_color_black' : 'page__info-tool-tip-text';
  const cardClassName = "movies-card";

  function handleSearch(isShort) {
    if (!isSearchTextValid(findSavedMovieText)) {
      getErrorRequestMessage(errorSearchTextInValidMessage);
    } else {
      hideErrorMessages();
    }
    filterMovies(savedMovies, findSavedMovieText, isShort, setFilteredSavedMovies)
  }

  useEffect(() => {
    checkSavedMovies();
    hideErrorMessages();
    setIsShortMovies(false);
    setFindSavedMovieText('');
    if (savedMovies.length) {
      setFilteredSavedMovies(savedMovies);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSavedMovies(savedMoviesCards);
    if (!savedMoviesCards.length) {
      setSavedMovies([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedMoviesCards.length]);

  useEffect(() => {
    handleSearch(isShortMovies);
    if (!savedMovies.length) {
      setFilteredSavedMovies([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedMovies, savedMoviesCards]);

  useEffect(() => {
    if (savedMovies.length) {
      handleSearch(isShortMovies);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [findSavedMovieText]);

  useEffect(() => {
    if (findSavedMovieText) {
      handleSearch(isShortMovies);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedMoviesCards.length]);

  useEffect(() => {
    if (findSavedMovieText) {
      handleSearch(isShortMovies);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShortMovies]);

  return (
    <div className="page__container">
      <Header />
      <main>
        <SearchForm
          findMovieText={findSavedMovieText}
          setFindMovieText={setFindSavedMovieText}
          isShortMovies={isShortMovies}
          setIsShortMovies={setIsShortMovies}
          onSearch={handleSearch}
        />
        {isInfoMessage &&
          <InfoToolTip
            additionalInfoClassStyles={infoToolTipStyle}
            additionalInfotextStyles={infoToolTipTextStyle}
            infoMessage={errorMessageText}
          />}
        {!isInfoMessage && <MoviesCardList isPreloaderActive={isPreloaderActive} cards={filteredSavedMovies} onCardDelete={handleConfirmDelCardClick} isMoviesPage={isMoviesPage} cardClassName={cardClassName} additionalStyles={additionalMoviesCardsStyles} />}
      </main>
      <Footer additionalFooterStyles={additionalFooterStyles} />
    </div>
  );
}

export default SavedMovies;
