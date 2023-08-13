import React from 'react';
import AboutProjectSectionHeading from './../../components/AboutProjectSectionHeading/AboutProjectSectionHeading';

function Techs() {

  return (
    <section id="techs" className="techs">
      <div className="techs__content">
        <AboutProjectSectionHeading headingTitle={"Технологии"} />
        <h3 className="techs__title">7 технологий</h3>
        <p className="techs__description">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <ul className="techs__list">
          <li className="techs__item techs__item-html">HTML</li>
          <li className="techs__item techs__item-css">CSS</li>
          <li className="techs__item techs__item-js">JS</li>
          <li className="techs__item techs__item-react">React</li>
          <li className="techs__item techs__item-git">Git</li>
          <li className="techs__item techs__item-express">Express.js</li>
          <li className="techs__item techs__item-mongodb">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;
