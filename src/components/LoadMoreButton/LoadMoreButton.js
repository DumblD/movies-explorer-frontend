import React from 'react';

function LoadMoreButton() {

  return (
    <section className="load-more">
      <button aria-label="загрузить ещё" type="button" className="load-more__button">
        <span className="load-more__button-text">Ещё</span>
      </button>
    </section>
  );
}

export default LoadMoreButton;
