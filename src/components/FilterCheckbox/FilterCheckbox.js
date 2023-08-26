import React, { useEffect }  from 'react';

function FilterCheckbox({
  isChecked,
  onChange,
  labelClassName,
  inputClassName,
  labelTextClassName,
  labelName,
  filterByShort,
  toggleShortFilms,
  isSearchTextSame,
  setIsSearchTextSame,
  textFilteredMovies,
  findMovieText,
}) {

  useEffect(() => {
  if (isSearchTextSame && findMovieText) {
    filterByShort();
    console.log('фильтруем результат');
  } else if (!isSearchTextSame && findMovieText) {
    toggleShortFilms();
    console.log('поиск по новым');
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked]);

/*   useEffect(() => {
    if (findMovieText) {
      setIsSearchTextSame(true);
    }
    if (isSearchTextSame && textFilteredMovies.length && findMovieText) {
      filterByShort();
      console.log('фильтруем результат');
    } else if (!isSearchTextSame && findMovieText) {
      toggleShortMovies();
      console.log('поиск по новым');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked]); */

/*   useEffect(() => {
    toggleShortMovies();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked]); */

  return (
    <>
    <label htmlFor="filterCheckbox" className={`${labelClassName} filter-checkbox`}>
      <input
        type="checkbox"
        id="filterCheckbox"
        className="filter-checkbox__input"
        checked={isChecked}
        onChange={onChange}
      />
      <span className={`${inputClassName} filter-checkbox__pseudo-item`}></span>
    </label>
    <span className={labelTextClassName}>{labelName}</span>
    </>
  );
}

export default FilterCheckbox;
