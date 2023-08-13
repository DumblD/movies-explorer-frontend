import React from 'react';
import AboutProjectSectionHeading from './../../components/AboutProjectSectionHeading/AboutProjectSectionHeading';

function AboutProject() {

  return (
    <section id="about-project" className="about-project">
      <AboutProjectSectionHeading headingTitle={"О проекте"} />
      <div className="about-project__description">
        <div className="about-project__description-item">
          <h3 className="about-project__description-title">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__description-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about-project__description-item">
          <h3 className="about-project__description-title">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__description-text">У каждого этапа были мягкий и жёсткий дедлайны, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="about-project__duration">
        <div className="about-project__duration-time-item about-project__duration-time-back-end"><p className="about-project__duration-time-text">1 неделя</p></div>
        <div className="about-project__duration-time-item about-project__duration-time-front-end"><p className="about-project__duration-time-text">4 недели</p></div>
        <p className="about-project__duration-text">Back-end</p>
        <p className="about-project__duration-text">Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;
