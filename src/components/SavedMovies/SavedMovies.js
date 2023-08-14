import React, { useEffect } from 'react';
import Header from './../Header/Header';
import SearchForm from './../SearchForm/SearchForm';
import MoviesCardList from './../MoviesCardList/MoviesCardList';
import LoadMoreButton from './../LoadMoreButton/LoadMoreButton';
import Footer from './../Footer/Footer';

function SavedMovies({
  getSavedMoviesCards,
  isPreloaderActive,
  handleRequest,
  savedMoviesCards,
  handleConfirmDelCardClick,
  onSearch,
  moviesCards,
  handleShortSavedMovies,
  isShortFilms,
  isLoadMore,
}) {

  const isMoviesPage = false;
  const additionalMoviesCardsStyles = 'movies-cards_padding_changed';
  useEffect(() => {
    handleRequest(getSavedMoviesCards);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moviesCards]);

  return (
    <div className="page__container">
      <Header />
      <main>
        <SearchForm handleRequest={handleRequest} handleShortFilmsCheck={handleShortSavedMovies} isShortFilms={isShortFilms} onSearch={onSearch} />
        <MoviesCardList isPreloaderActive={isPreloaderActive} cards={savedMoviesCards} onCardDelete={handleConfirmDelCardClick} isMoviesPage={isMoviesPage} additionalStyles={additionalMoviesCardsStyles} />
        <LoadMoreButton isActive={isLoadMore} />
      </main>
      <Footer />
    </div>
  );
}

export default SavedMovies;
