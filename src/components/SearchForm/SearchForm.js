import React, { useState, useRef } from 'react';
import FilterCheckbox from './../../components/FilterCheckbox/FilterCheckbox';
import { isSearchTextEmpty, errorEmptyMessageText } from '../../utils/constants/constants';

import './SearchForm.css';

function SearchForm({
  findMovieText,
  setFindMovieText,
  isShortMovies,
  setIsShortMovies,
  onSearch,
  searchFormStyle,
  isMoviePage,
  hideErrorMessages,
  getErrorRequestMessage,
  findSavedMovieText,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const searchFormInput = useRef(null);

  const filterLabelClassName = 'movies-search__filter-checkbox-label';
  const filterInputClassName = `movies-search__filter-checkbox-tumb-button ${!isShortMovies ? 'movies-search__filter-checkbox-tumb-button_disabled' : ''}`;
  const filterLabelTextClassName = 'movies-search__filter-checkbox-label-text';
  const filterLabelName = 'Короткометражки';
  const searchFormStyles = typeof searchFormStyle === "undefined" ? 'movies-search' : searchFormStyle;

  function handleChange(ev) {
    setFindMovieText(ev.target.value);
  }

  function handleFocus(ev) {
    setIsFocused(true);
    if (!isMoviePage) {
      if (isSearchTextEmpty(findSavedMovieText)) {
        getErrorRequestMessage(errorEmptyMessageText);
      }
    }
  }

  function handleBlur(ev) {
    setIsFocused(false);
    if (!isMoviePage) {
      hideErrorMessages();
    }
  }

  function toggleIsShort() {
    setIsShortMovies(!isShortMovies);
  }

  function handleSearch(ev) {
    ev.preventDefault();
    onSearch();
  }

  return (
    <section className={`${searchFormStyles}`}>
      <form onSubmit={handleSearch} name='searchForm' className='movies-search__search-form search-form' noValidate>
        <input
          type="text"
          name="searchForm"
          id="searchForm"
          className="search-form__input search-form__input_el_search-movie"
          placeholder="Фильм"
          value={findMovieText}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={searchFormInput}
        />
        <button aria-label="найти" type="submit" disabled={!findMovieText} className={`search-form__button ${findMovieText ? '' : 'search-form__button_disabled'}`} />
      </form>
      <div className={`movies-search__short-films ${isFocused ? 'input-focused' : ''}`}>
        <FilterCheckbox
          isChecked={isShortMovies}
          onChange={toggleIsShort}
          labelClassName={filterLabelClassName}
          inputClassName={filterInputClassName}
          labelTextClassName={filterLabelTextClassName}
          labelName={filterLabelName}
        />
      </div>
    </section>
  );
}

export default SearchForm;
