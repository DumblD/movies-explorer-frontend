import React from 'react';
import './FormInput.css';

function FormInput({
  type,
  name,
  className,
  required,
  minLength,
  maxLength,
  placeholder,
  value,
  onChange,
  inputElement,
  isInputValid,
  errorMessageText,
  pattern,
  title,
  inputId,
  labelForAttribute,
  labelName,
  inputRef,
  isNoSpanErrors,
  labelsClassName,
}) {

  function handleCheckValidity(ev) {
    onChange(ev, inputElement);
  }

  return (
    <>
      <label className={labelsClassName ? labelsClassName : 'input_labeles'} htmlFor={labelForAttribute}>{labelName}</label>
      <input
        id={inputId}
        type={type}
        name={name}
        className={typeof isInputValid === "undefined" ? `${className}` : isInputValid ? `${className}` : `input_type_error ${className}`}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        onChange={handleCheckValidity}
        pattern={pattern ? `${pattern}` : undefined}
        title={name === "registerPassword" ? '' : title ? `${title}` : ''}
        ref={typeof inputRef === "undefined" ? null : inputRef ? inputRef : null}
      />
      {isNoSpanErrors ? '' : <span className={`input_span_error ${name}-error`}>{name === "registerPassword" && errorMessageText ? title : errorMessageText}</span>}
    </>
  );
}

export default FormInput;
