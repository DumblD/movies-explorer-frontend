import React, { useEffect } from 'react';
import Header from './../Header/Header';
import SearchForm from './../SearchForm/SearchForm';
import MoviesCardList from './../MoviesCardList/MoviesCardList';
import LoadMoreButton from './../LoadMoreButton/LoadMoreButton';
import Footer from './../Footer/Footer';

function Movies({
  getMoviesCards,
  moviesCards,
  isPreloaderActive,
  cards,
  handleCardLike,
  onSearch,
  handleShortMovies,
  isShortFilms,
  onLoadMore,
  isLoadMore,
}) {

  useEffect(() => {
    console.log(moviesCards.length);
    if (moviesCards.length) {
      getMoviesCards();
      console.log(moviesCards);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // dependency [moviesCards] temporarily removed
  // due to endless re-rendering
  }, []);

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
