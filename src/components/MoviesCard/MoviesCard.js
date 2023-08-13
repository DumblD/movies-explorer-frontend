import React from 'react';

function MoviesCard({
  card,
  onCardDelete,
  onCardLike,
  cardClassName,
  isMoviesPage,
}) {

  function handleCardLike() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  function minToHourMin(min) {
    let res;
    if (min % 60 === min) {
      res = `0ч ${min}м`;
    } else if (min % 60 === 0) {
      res = `${min / 60}ч ${0}м`;
    } else {
      res = `${Math.trunc(min / 60)}ч ${min % 60}м`;
    }
    return res;
  }

  const movieDuration = minToHourMin(card.duration);
  const isLiked = card.like;

  return (
    <li className={`card ${typeof cardClassName === "undefined" ? '' : cardClassName ? `${cardClassName}` : ''}`}>
      <div className="card__img" style={{ backgroundImage: `url('${card.link}')` }} />
      <h3 className="card__title">{card.name}</h3>
      {isMoviesPage ? (
        <button aria-label="поставить лайк" type="button" onClick={handleCardLike} className={`movies-card__like-button ${isLiked && 'movies-card__like-button_active'}`} />
      ) : (
        <button aria-label="удалить карточку" type="button" className="card__del-button" onClick={handleCardDelete} />
      )}
      <h4 className="card__time-duration">{movieDuration}</h4>
    </li>
  );
}

export default MoviesCard;
