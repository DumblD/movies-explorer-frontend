import React, { useState, useRef } from 'react';
import FilterCheckbox from './../../components/FilterCheckbox/FilterCheckbox';

import './SearchForm.css';

function SearchForm({
  findMovieText,
  setFindMovieText,
  isShortMovies,
  setIsShortMovies,
  onSearch,
  textFilteredMovies,
  setIsSearchTextSame,
  filteredMovies,
  isSearchTextSame,
  filterByShort,
  toggleShortFilms,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const searchFormInput = useRef(null);

  const filterLabelClassName = 'movies-search__filter-checkbox-label';
  const filterInputClassName = `movies-search__filter-checkbox-tumb-button ${!isShortMovies ? 'movies-search__filter-checkbox-tumb-button_disabled' : ''}`;
  const filterLabelTextClassName = 'movies-search__filter-checkbox-label-text';
  const filterLabelName = 'Короткометражки';

  function handleChange(ev) {
    setFindMovieText(ev.target.value);
  }

  function handleFocus(ev) {
    setIsFocused(true);
  }

  function handleBlur(ev) {
    setIsFocused(false);
  }

  function toggleIsShort() {
    setIsShortMovies(!isShortMovies);
  }

  function handleSearch(ev) {
    ev.preventDefault();
    onSearch();
  }

/*   useEffect(() => {
    const lastSearchMovies = localStorage.getItem('lastSearchMovies');
    const lastSearchSavedMovies = localStorage.getItem('lastSearchSavedMovies');
    if (lastSearchMovies) {
      setPreviousFindMovieText(lastSearchMovies);
    } else if (lastSearchSavedMovies) {
      setPreviousFindMovieText(lastSearchSavedMovies);
    }
    console.log(findMovieText);
    console.log(123);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); */

/*   useEffect(() => { ------------------------------------------------раскоммитить
    setIsSearchTextSame(previousFindMovieText === findMovieText);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previousFindMovieText]); */

  return (
    <section className='movies-search'>
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
          filterByShort={filterByShort}
          toggleShortFilms={toggleShortFilms}
          isSearchTextSame={isSearchTextSame}
          setIsSearchTextSame={setIsSearchTextSame}
          textFilteredMovies={textFilteredMovies}
          findMovieText={findMovieText}
        />
      </div>
    </section>
  );
}

export default SearchForm;
