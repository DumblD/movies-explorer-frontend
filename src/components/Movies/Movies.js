import React, { useEffect } from 'react';
import Header from './../Header/Header';
import SearchForm from './../SearchForm/SearchForm';
import MoviesCardList from './../MoviesCardList/MoviesCardList';
import LoadMoreButton from './../LoadMoreButton/LoadMoreButton';
import Footer from './../Footer/Footer';

function Movies({
  getMoviesCards,
  isPreloaderActive,
  handleRequest,
  cards,
  handleCardLike,
  onSearch,
  handleShortMovies,
  isShortFilms,
}) {

  const cardClassName = "movies-card"
  const isMoviesPage = true;

  useEffect(() => {
    handleRequest(getMoviesCards);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page__container">
      <Header />
      <main>
        <SearchForm handleRequest={handleRequest} handleShortFilmsCheck={handleShortMovies} isShortFilms={isShortFilms} onSearch={onSearch} />
        <MoviesCardList isPreloaderActive={isPreloaderActive} cards={cards} onCardLike={handleCardLike} cardClassName={cardClassName} isMoviesPage={isMoviesPage} />
        <LoadMoreButton />
      </main>
      <Footer />
    </div>
  );
}

export default Movies;
