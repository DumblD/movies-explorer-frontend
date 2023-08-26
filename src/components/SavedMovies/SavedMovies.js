import React, { useEffect } from 'react';
import Header from './../Header/Header';
import SearchForm from './../SearchForm/SearchForm';
import MoviesCardList from './../MoviesCardList/MoviesCardList';
import LoadMoreButton from './../LoadMoreButton/LoadMoreButton';
import Footer from './../Footer/Footer';
import InfoToolTip from './../../components/InfoToolTip/InfoToolTip';
import { useLocalStorage } from './../../utils/customHooks/useLocalStorage';

function SavedMovies({
  cards,
  getSavedMoviesCards,
  isPreloaderActive,
  filteredMovies,
  setFilteredMovies,
  setMoviesCardsNumToRender,
  findMovieText,
  setFindMovieText,
  handleConfirmDelCardClick,
  onSearch,
  isShortMovies,
  setIsShortMovies,
  isLoadMore,
  onLoadMore,
  setIsSearchTextSame,
  isInfoMessage,
  errorMessageText,
  toggleShortMovies,
}) {
  const { getLikedMoviesId } = useLocalStorage();
  const isMoviesPage = false;
  const additionalMoviesCardsStyles = 'movies-cards_padding_changed';

  const infoToolTipStyle = "page__info-tool-tip";
  const infoToolTipTextStyle = "page__info-tool-tip-text";
  const cardClassName = "movies-card";

  function toggleShort() {
    toggleShortMovies(onSearch);
  }

  useEffect(() => {
    setFilteredMovies([]);
    setIsShortMovies(false);
    setFindMovieText('');
    getSavedMoviesCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (cards.length) {
      getLikedMoviesId(cards);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards]);

/*   useEffect(() => {
    if (filteredMovies.length) {
      setMoviesCardsNumToRender(filteredMovies.length);
    }
    console.log(filteredMovies.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredMovies]); // moviesCards было */

  return (
    <div className="page__container">
      <Header />
      <main>
        <SearchForm
          findMovieText={findMovieText}
          setFindMovieText={setFindMovieText}
          isShortMovies={isShortMovies}
          setIsShortMovies={setIsShortMovies}
          onSearch={onSearch}
          setIsSearchTextSame={setIsSearchTextSame}
          toggleShortMovies={toggleShort}
        />
        {isInfoMessage &&
          <InfoToolTip
            additionalInfoClassStyles={infoToolTipStyle}
            additionalInfotextStyles={infoToolTipTextStyle}
            infoMessage={errorMessageText}
          />}
        {!isInfoMessage && <MoviesCardList isPreloaderActive={isPreloaderActive} cards={cards} onCardDelete={handleConfirmDelCardClick} isMoviesPage={isMoviesPage} cardClassName={cardClassName} additionalStyles={additionalMoviesCardsStyles} />}
        <LoadMoreButton isInfoMessage={isInfoMessage} isActive={false} onLoadMore={onLoadMore} />
      </main>
      <Footer />
    </div>
  );
}

export default SavedMovies;
