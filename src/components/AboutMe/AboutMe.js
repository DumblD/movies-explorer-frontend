import React from 'react';
import AboutProjectSectionHeading from './../AboutProjectSectionHeading/AboutProjectSectionHeading';
import aboutMePhoto from './../../images/about-me-photo.png';

function AboutMe() {

  return (
    <section id="about-me" className="about-me">
      <AboutProjectSectionHeading headingTitle={"Студент"} />
      <div className="about-me__content">
        <div className="about-me__info">
          <h3 className="about-me__name">Виталий</h3>
          <h4 className="about-me__major-in">Фронтенд-разработчик, 30 лет</h4>
          <p className="about-me__description">Я родился и живу в Саратове, закончил факультет экономики СГУ.
            У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
            С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке,
            начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <p className="about-me__github">Github</p>
        </div>
        <div className="about-me__photo">
          <img className='about-me__photo-img' src={aboutMePhoto} alt='о себе: фото' />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
