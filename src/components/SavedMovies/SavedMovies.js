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
  cards,
  handleConfirmDelCardClick,
  onSearch,
  handleShortSavedMovies,
  isShortFilms,
  isLoadMore,
  onLoadMore,
  isInfoMessage,
}) {

  const isMoviesPage = false;
  const additionalMoviesCardsStyles = 'movies-cards_padding_changed';
  useEffect(() => {
    handleRequest(getSavedMoviesCards);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page__container">
      <Header />
      <main>
        <SearchForm handleRequest={handleRequest} handleShortFilmsCheck={handleShortSavedMovies} isShortFilms={isShortFilms} onSearch={onSearch} />
        <MoviesCardList isPreloaderActive={isPreloaderActive} cards={cards} onCardDelete={handleConfirmDelCardClick} isMoviesPage={isMoviesPage} additionalStyles={additionalMoviesCardsStyles} />
        <LoadMoreButton isInfoMessage={isInfoMessage} isActive={isLoadMore} onLoadMore={onLoadMore} />
      </main>
      <Footer />
    </div>
  );
}

export default SavedMovies;
