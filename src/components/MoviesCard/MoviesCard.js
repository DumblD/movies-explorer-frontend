import React from 'react';
import { minToHourMin } from '../../utils/constants/constants';

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

  const movieDuration = minToHourMin(card.duration);
  const imgCardLink = isMoviesPage? `https://api.nomoreparties.co/${card.image.url}` : `${card.image}`;
  const isLikedMovie = checkLike();
  const isLiked = isLikedMovie ? true : false;

  function checkLike() {
    if (localStorage.getItem('likedMovies')) {
      const likedId = JSON.parse(localStorage.getItem('likedMovies'));
      const isLiked = likedId.some((id) => {
        return card.id === parseInt(id, 10);
      })
      return isLiked;
    }
  }

  return (
    <li className={`card ${typeof cardClassName === "undefined" ? '' : cardClassName}`}>
      <a href={card.trailerLink} className="card__img-link" target="_blank" rel="noreferrer">
        <img className="card__img" src={imgCardLink} alt={card.nameRU} />
      </a>
      <h3 className="card__title">{card.nameRU}</h3>
      {isMoviesPage ? (
        <button aria-label="поставить лайк" type="button" onClick={handleCardLike} className={`movies-card__like-button ${isLiked ? 'movies-card__like-button_active' : ''}`} />
      ) : (
        <button aria-label="удалить карточку" type="button" className="card__del-button" onClick={handleCardDelete} />
      )}
      <h4 className="card__time-duration">{movieDuration}</h4>
    </li>
  );
}

export default MoviesCard;
