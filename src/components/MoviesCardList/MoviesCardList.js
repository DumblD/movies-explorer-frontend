import React from 'react';
import MoviesCard from './../MoviesCard/MoviesCard';
import Preloader from './../Preloader/Preloader';

function MoviesCardList({
  isPreloaderActive,
  cards,
  onCardLike,
  onCardDelete,
  cardClassName,
  isMoviesPage,
  additionalStyles,
}) {

  const cardMovieClassName = typeof cardClassName === "undefined" ? '' : cardClassName;
  const extraStyles = typeof additionalStyles === "undefined" ? false : additionalStyles;

  return (
    <section className={`movies-cards ${additionalStyles ? `${extraStyles}` : ''}`}>
      {isPreloaderActive && <Preloader />}
      <ul className={`movies-cards__list ${isPreloaderActive ? 'movies-cards__list_invisible' : ''}`}>
        {cards.map((cardElement) => (
          <MoviesCard key={cardElement.id || cardElement.movieId} card={cardElement} cardClassName={cardMovieClassName} onCardLike={onCardLike} onCardDelete={onCardDelete} isMoviesPage={isMoviesPage} />
        ))}
      </ul>
    </section>
  );
}

export default MoviesCardList;
