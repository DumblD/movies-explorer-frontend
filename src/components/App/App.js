import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { moviesCardsData } from '../../utils/constants/constants';
import Main from './../../components/Main/Main';
import Movies from './../../components/Movies/Movies';
import SavedMovies from './../../components/SavedMovies/SavedMovies';
import Register from './../../components/Register/Register';
import Login from './../../components/Login/Login';
import Profile from './../../components/Profile/Profile';
import ConfirmDelCardPopup from './../../components/ConfirmDelCardPopup/ConfirmDelCardPopup';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedCardToDelete, setSelectedCardToDelete] = useState({});
  const [isConfirmDelCardPopupOpen, setIsConfirmDelCardPopupOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isPreloaderActive, setIsPreloaderActive] = useState(false);
  const [savedMoviesCards, setSavedMoviesCards] = useState([]);
  const [moviesCards, setMoviesCards] = useState([]);
  const [isShortMovies, setIsShortMovies] = useState(true);
  const [isShortSavedMovies, setIsShortSavedMovies] = useState(true);

  function getMoviesCards() {
    // Api request for movies cards
    setMoviesCards(moviesCardsData);
  }

  function getSavedMoviesCards() {
    if (!moviesCards.length) {
      getMoviesCards();
    }
    // Api request for saved movies cards
    const likedMovies = moviesCards.filter((cardElement) => {
      return cardElement.like === true;
    });
    setSavedMoviesCards(likedMovies);
  }

  function closeAllPopups() {
    setIsConfirmDelCardPopupOpen(false);
  }

  function handleConfirmDelCardClick(card) {
    setSelectedCardToDelete(card);
    setIsConfirmDelCardPopupOpen(true);
  }

  function handleCardLike(card) {
    // Api request -> returns new card with updated like status
    const newMoviesCard = moviesCards.find((el) => {
      return card._id === el._id;
    });
    newMoviesCard.like = !card.like;
    // movies cards update (with card with updated like status)
    const updatedMoviesCards = moviesCards.map((cardElement) => {
      return cardElement._id === card._id ? newMoviesCard : cardElement;
    });
    setMoviesCards(
      updatedMoviesCards,
    );
  }

  function handleCardDelete(card) {
    handleCardLike(card);
    closeAllPopups();
  }

  function handleConfirmDelCard() {
    handleCardDelete(selectedCardToDelete);
  }

  function handleProfileLogout() {
    setLoggedIn(false);
  }

  function togglePreloader(isActive) {
    setIsPreloaderActive(isActive);
  }

  function handleRequest(request) {
    togglePreloader(true);
    request();
    setTimeout(() => {
      togglePreloader(false);
    }, 1000);
  }

  function handleShortMovies() {
    setIsShortMovies(!isShortMovies);
  };

  function handleShortSavedMovies() {
    setIsShortSavedMovies(!isShortSavedMovies);
  };

  function handleSearchMovies() {
    // Api request
    // ...
  }

  function handleSearchSavedMovies() {
    // function filters movies on front
    // ...
  }

  return (
    <>
      <Routes>
        <Route path="*" element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="/signin" replace />} />
        <Route path="/" element={<Main loggedIn={loggedIn} />} />
        <Route path="/movies" element={
          <Movies
            getMoviesCards={getMoviesCards}
            isPreloaderActive={isPreloaderActive}
            handleRequest={handleRequest}
            cards={moviesCards}
            handleCardLike={handleCardLike}
            onSearch={handleSearchMovies}
            handleShortMovies={handleShortMovies}
            isShortFilms={isShortMovies}
          />} />
        <Route path="/saved-movies" element={
          <SavedMovies
            getSavedMoviesCards={getSavedMoviesCards}
            isPreloaderActive={isPreloaderActive}
            handleRequest={handleRequest}
            savedMoviesCards={savedMoviesCards}
            handleConfirmDelCardClick={handleConfirmDelCardClick}
            onSearch={handleSearchSavedMovies}
            moviesCards={moviesCards}
            handleShortSavedMovies={handleShortSavedMovies}
            isShortFilms={isShortSavedMovies}
            isLoadMore={isLoadMore}
          />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/profile" element={<Profile onLogout={handleProfileLogout} />} />
      </Routes>
      <ConfirmDelCardPopup
        isOpen={isConfirmDelCardPopupOpen}
        onConfirmDelCard={handleConfirmDelCard}
        onClose={closeAllPopups}
      />
    </>
  );
}

export default App;
