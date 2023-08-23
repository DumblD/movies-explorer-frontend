import React from 'react';

function FormInput({
  type,
  name,
  sectionClassName,
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
  labelClassName,
}) {

  function handleCheckValidity(ev) {
    onChange(ev, inputElement);
  }

  return (
    <>
      <label className={labelClassName} htmlFor={labelForAttribute}>{labelName}</label>
      <input
        id={inputId}
        type={type}
        name={name}
        className={typeof isInputValid === "undefined" ? `${className}` : isInputValid ? `${className}` : `${className} ${className}_type_error`}
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
      {isNoSpanErrors ? '' : <span className={`${sectionClassName}__input-span-error ${name}-error`}>{name === "registerPassword" && errorMessageText ? title : name === "registerName" && errorMessageText ? title : name.toLowerCase().includes('email') && errorMessageText ? title : errorMessageText}</span>}
    </>
  );
}

export default FormInput;
