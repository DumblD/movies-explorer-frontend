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
}) {

  return (
    <section className="movies-cards">
      {isPreloaderActive && <Preloader />}
      <ul className={`movies-cards__list ${isPreloaderActive && 'movies-cards__list_invisible'}`}>
        {cards.map((cardElement) => (
          <MoviesCard key={cardElement._id} card={cardElement} cardClassName={cardClassName} onCardLike={onCardLike} onCardDelete={onCardDelete} isMoviesPage={isMoviesPage} />
        ))}
      </ul>
    </section>
  );
}

export default MoviesCardList;
