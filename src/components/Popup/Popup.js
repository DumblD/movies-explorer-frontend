import React, { useEffect } from 'react';

function Popup({
  isOpen,
  onClose,
  name,
  children
}) {

  useEffect(() => {
    if (!isOpen) return;

    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', closeByEscape)
    return () => document.removeEventListener('keydown', closeByEscape)
  }, [isOpen, onClose]);

  // обработчик для закрытия при клике на оверлей
  const handleOverlayClose = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div onClick={handleOverlayClose} className={`popup ${name ? `popup_type_${name}` : ''} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button aria-label="закрыть" type="button" className="popup__close-button" onClick={onClose} />
        {children}
      </div>
    </div>
  );
}

export default Popup;
