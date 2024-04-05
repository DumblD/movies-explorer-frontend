import React from 'react';
import Popup from './../Popup/Popup';

function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  children,
  onSubmit,
  submitButtonText,
}) {

  return (
    <Popup isOpen={isOpen} onClose={onClose} name={name}>
      <form name={name} className="popup__form" onSubmit={onSubmit} noValidate>
        <h3 className="popup__title">{title}</h3>
        {children}
        <button aria-label="подтвердить" type="submit" className="popup__button">{submitButtonText}</button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
