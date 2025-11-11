import React from 'react';
import ProjectSectionHeading from './../ProjectSectionHeading/ProjectSectionHeading';
import aboutMePhoto from './../../images/about-me-photo.png';

function AboutMe() {

  return (
    <section id="about-me" className="about-me">
      <ProjectSectionHeading sectionClassName={"about-me"} headingTitle={"Студент"} />
      <div className="about-me__content">
        <div className="about-me__info">
          <h3 className="about-me__name">Артем</h3>
          <h4 className="about-me__major-in">Веб-разработчик</h4>
          <p className="about-me__description">Кодить нравится. Ищу стажировку / работу в сфере веб-разработки.</p>
          <a href="https://github.com/DumblD" className="about-me__github-link" target="_blank" rel="noreferrer">Github</a>
        </div>
        <div className="about-me__photo">
          <img className='about-me__photo-img' src={aboutMePhoto} alt='о себе: фото' />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
