import React from 'react';

function LoadMoreButton({
  isActive,
  onLoadMore,
}) {

  return (
    <section className="load-more">
      <button aria-label="загрузить ещё" type="button" onClick={onLoadMore} className={`load-more__button ${!isActive ? 'load-more__button_disabled' : ''}`}>
        <span className="load-more__button-text">Ещё</span>
      </button>
    </section>
  );
}

export default LoadMoreButton;
