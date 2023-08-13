import React from 'react';
import './NotFoundPage.css';
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {

  const navigate = useNavigate();

  function handlePreview() {
    navigate('/', { replace: true });
  }

  return (
    <div className='not-found-page'>
      <h1 className='not-found-page__title'>404</h1>
      <h2 className='not-found-page__description'>Страница не найдена</h2>
      <button aria-label="назад" type="button" onClick={handlePreview} className='not-found-page__prev-button'>Назад</button>
    </div>
  );
}

export default NotFoundPage;
