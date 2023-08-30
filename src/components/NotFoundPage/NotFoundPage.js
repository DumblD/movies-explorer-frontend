import React from 'react';
import './NotFoundPage.css';
import { useNavigate } from 'react-router-dom';
import { previewPage } from '../../utils/constants/constants';

function NotFoundPage() {
  const navigate = useNavigate();

  function handlePreview() {
    navigate(previewPage, { replace: true });
  }

  return (
    <>
      <header className="not-found-page__header">
        <h1 className='not-found-page__title'>404</h1>
      </header>
      <main className="not-found-page__content">
        <h2 className='not-found-page__description'>Страница не найдена</h2>
      </main>
      <footer className="not-found-page__footer">
        <button aria-label="назад" type="button" onClick={handlePreview} className='not-found-page__prev-button'>Назад</button>
      </footer>
    </>
  );
}

export default NotFoundPage;
