import React from 'react';

function LoadMoreButton({
  isInfoMessage,
  isActive,
  onLoadMore,
}) {

  const isLoadMoreActive = isInfoMessage ? false : isActive;

  return (
    <section className="load-more">
      <button aria-label="загрузить ещё" type="button" onClick={onLoadMore} className={`load-more__button ${isLoadMoreActive ? '' : 'load-more__button_disabled'}`}>
        <span className="load-more__button-text">Ещё</span>
      </button>
    </section>
  );
}

export default LoadMoreButton;
