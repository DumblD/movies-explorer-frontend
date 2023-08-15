import React, { useState } from 'react';
import FilterCheckbox from './../../components/FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm({
  handleRequest,
  onSearch,
  isShortFilms,
  handleShortFilmsCheck,
}) {

  const [searchMovie, setSearchMovie] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const filterLabelClassName = 'movies-search__filter-checkbox-label';
  const filterInputClassName = `movies-search__filter-checkbox-tumb-button ${!isShortFilms ? 'movies-search__filter-checkbox-tumb-button_disabled' : ''}`;
  const filterLabelTextClassName = 'movies-search__filter-checkbox-label-text';
  const filterLabelName = 'Короткометражки';

  function handleChange(ev) {
    setSearchMovie(ev.target.value);
  }

  function handleFocus(ev) {
    setIsFocused(true);
  }

  function handleBlur(ev) {
    setIsFocused(false);
  }

  function handleSearch(ev) {
    ev.preventDefault();
    handleRequest(onSearch);
  }

  return (
    <section className='movies-search'>
      <form onSubmit={handleSearch} name='searchForm' className='movies-search__search-form search-form' noValidate>
        <input
          type="text"
          name="searchForm"
          id="searchForm"
          className="search-form__input search-form__input_el_search-movie"
          placeholder="Фильм"
          value={searchMovie}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <button aria-label="найти" type="submit" disabled={!searchMovie} className={`search-form__button ${searchMovie ? '' : 'search-form__button_disabled'}`} />
      </form>
      <div className={`movies-search__short-films ${isFocused ? 'input-focused' : ''}`}>
        <FilterCheckbox
          isChecked={isShortFilms}
          onChange={handleShortFilmsCheck}
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
