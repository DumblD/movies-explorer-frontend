import React from 'react';

function LoadMoreButton({
  isActive
}) {

  const isLoadMoreActive = typeof isActive === "undefined" ? true : isActive;

  return (
    <section className="load-more">
      <button aria-label="загрузить ещё" type="button" className={`load-more__button ${!isLoadMoreActive ? 'load-more__button_disabled' : ''}`}>
        <span className="load-more__button-text">Ещё</span>
      </button>
    </section>
  );
}

export default LoadMoreButton;
