import React from 'react';

function NavTab() {

  return (
    <nav className="navtab">
      <ul className="navtab__menu-links">
        <li className="navtab__menu-item"><a href="#about-project" className="navtab__menu-link">О проекте</a></li>
        <li className="navtab__menu-item"><a href="#techs" className="navtab__menu-link">Технологии</a></li>
        <li className="navtab__menu-item"><a href="#about-me" className="navtab__menu-link">Студент</a></li>
      </ul>
    </nav>
  );
}

export default NavTab;
