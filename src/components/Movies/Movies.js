import React from 'react';
import Header from './../Header/Header';
import SearchForm from './../SearchForm/SearchForm';
import MoviesCardList from './../MoviesCardList/MoviesCardList';
import LoadMoreButton from './../LoadMoreButton/LoadMoreButton';
import Footer from './../Footer/Footer';

function Movies({
  isPreloaderActive,
  cards,
  handleCardLike,
  onSearch,
  handleShortMovies,
  isShortFilms,
  onLoadMore,
  isLoadMore,
}) {

  const cardClassName = "movies-card"
  const isMoviesPage = true;

  return (
    <div className="page__container">
      <Header />
      <main>
        <SearchForm handleShortFilmsCheck={handleShortMovies} isShortFilms={isShortFilms} onSearch={onSearch} />
        <MoviesCardList isPreloaderActive={isPreloaderActive} cards={cards} onCardLike={handleCardLike} cardClassName={cardClassName} isMoviesPage={isMoviesPage} />
        <LoadMoreButton isActive={isLoadMore} onLoadMore={onLoadMore} />
      </main>
      <Footer />
    </div>
  );
}

export default Movies;
