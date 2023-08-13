import React, { useEffect } from 'react';
import Header from './../Header/Header';
import SearchForm from './../SearchForm/SearchForm';
import MoviesCardList from './../MoviesCardList/MoviesCardList';
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
}) {

  const isMoviesPage = false;

  useEffect(() => {
    handleRequest(getSavedMoviesCards);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moviesCards]);

  return (
    <div className="page__container">
      <Header />
      <main>
        <SearchForm handleRequest={handleRequest} handleShortFilmsCheck={handleShortSavedMovies} isShortFilms={isShortFilms} onSearch={onSearch} />
        <MoviesCardList isPreloaderActive={isPreloaderActive} cards={savedMoviesCards} onCardDelete={handleConfirmDelCardClick} isMoviesPage={isMoviesPage} />
      </main>
      <Footer />
    </div>
  );
}

export default SavedMovies;
