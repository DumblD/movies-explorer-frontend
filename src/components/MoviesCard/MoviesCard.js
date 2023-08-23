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
  const imgCardLink = `https://api.nomoreparties.co/${card.image.url}`;
  const isLiked = typeof card.owner === "undefined" ? false : true;

  return (
    <li className={`card ${typeof cardClassName === "undefined" ? '' : cardClassName}`}>
      <a href={card.trailerLink} className="card__img-link" target="_blank" rel="noreferrer">
        <img className="card__img" src={imgCardLink} alt={card.nameRU} />
      </a>
      <h3 className="card__title">{card.nameRU}</h3>
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
