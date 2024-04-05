import React from 'react';
import PopupWithForm from './../PopupWithForm/PopupWithForm';

function ConfirmDelCardPopup({
  isOpen,
  onClose,
  onConfirmDelCard
}) {

  const submitButtonText = `Да`;

  function handleConfirmDelCardSubmit(ev) {
    ev.preventDefault();
    onConfirmDelCard();
  }

  return (
    <PopupWithForm
      name="confirmDelForm"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleConfirmDelCardSubmit}
      submitButtonText={submitButtonText}
    />
  );
}

export default ConfirmDelCardPopup;
