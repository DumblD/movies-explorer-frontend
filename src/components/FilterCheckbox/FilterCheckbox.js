import React from 'react';

function FilterCheckbox({
  isChecked,
  onChange,
  labelClassName,
  inputClassName,
  labelTextClassName,
  labelName,
}) {

  return (
    <label htmlFor="filterCheckbox" className={`${labelClassName} filter-checkbox`}>
      <input
        type="checkbox"
        id="filterCheckbox"
        className="filter-checkbox__input"
        checked={isChecked}
        onChange={onChange}
      />
      <span className={`${inputClassName} filter-checkbox__pseudo-item`}></span>
      <span className={labelTextClassName}>{labelName}</span>
    </label>
  );
}

export default FilterCheckbox;
