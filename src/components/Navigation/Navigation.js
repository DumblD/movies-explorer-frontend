import React from 'react';
import { NavLink } from 'react-router-dom';

function Navigation({
  isMobileMenu,
  isMainPage,
}) {

  const isMainPageOpened = typeof isMainPage === "undefined" ? false : isMainPage;

  return (
    <>
      {isMobileMenu ? (
        <>
          <li className="mobile-menu__main-page-link mobile-menu__list-item">
            <NavLink className={({ isActive }) => `mobile-menu__link ${isActive ? "mobile-menu__link_active" : ""}`} to='/'>Главная</NavLink>
          </li>
          <li className="mobile-menu__movies-link mobile-menu__list-item">
            <NavLink className={({ isActive }) => `mobile-menu__link ${isActive ? "mobile-menu__link_active" : ""}`} to='/movies'>Фильмы</NavLink>
          </li>
          <li className="mobile-menu__saved-movies-link mobile-menu__list-item">
            <NavLink className={({ isActive }) => `mobile-menu__link ${isActive ? "mobile-menu__link_active" : ""}`} to='/saved-movies'>Сохранённые фильмы</NavLink>
          </li>
        </>
      ) : (
        <>
          <li className="header__movies-link header__list-item">
            <NavLink className={({ isActive }) => `header__link ${isMainPageOpened && 'header__link_color_white'} ${isActive ? "header__link_active" : ""}`} to='/movies'>Фильмы</NavLink>
          </li>
          <li className="header__saved-movies-link header__list-item">
            <NavLink className={({ isActive }) => `header__link ${isMainPageOpened && 'header__link_color_white'} ${isActive ? "header__link_active" : ""}`} to='/saved-movies'>Сохранённые фильмы</NavLink>
          </li>
        </>
      )}
    </>
  );
}

export default Navigation;
