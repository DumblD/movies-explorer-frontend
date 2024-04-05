import React from 'react';
import promoLogo from './../../images/promo-landing-logo.svg';

function Promo() {

  return (
    <section className="promo">
      <div className="promo__landing-logo" style={{ backgroundImage: `url('${promoLogo}')` }} />
      <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
    </section>
  );
}

export default Promo;
