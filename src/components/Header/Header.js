import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from './../../components/Navigation/Navigation';
import MobileMenu from './../../components/MobileMenu/MobileMenu';
import headerAccountIcon from './../../images/header-account-icon.svg';

function Header({
  loggedIn,
  isMainPage,
}) {

  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
  const navigate = useNavigate();
  const isMobileMenu = false;
  const logged = typeof loggedIn === "undefined" ? true : loggedIn;
  const isMainPageOpened = typeof isMainPage === "undefined" ? false : isMainPage;

  function onAccountClick() {
    navigate('/profile', { replace: true });
  }

  function onLogoClick() {
    navigate('/', { replace: true });
  }

  function onLoginClick() {
    navigate('/signin', { replace: true });
  }

  function onRegisterClick() {
    navigate('/signup', { replace: true });
  }

  function toggleMobileMenu() {
    isMobileMenuActive ? setIsMobileMenuActive(false)
      : setIsMobileMenuActive(true);
  }

  return (
    <>
      {logged ? (
        <header className={`header ${isMainPageOpened && 'header_bg_blue'}`}>
          <div className="header__menu">
            <button aria-label="лого-переход на: о проекте" type="button" onClick={onLogoClick} className="header__logo-button" />
            <nav>
              <ul className="header__menu-links">
                <Navigation isMobileMenu={isMobileMenu} isMainPage={isMainPage} />
                <li className="header__account-menu">
                  <button aria-label="аккаунт" type='button' onClick={onAccountClick} className={`header__account-button ${isMainPageOpened && 'header__account-button_bg_green'}`}>
                    <img className='header__account-button-icon' src={headerAccountIcon} alt='аккаунт-лого' />
                    <span className='header__account-button-text'>Аккаунт</span>
                  </button>
                  <button aria-label="меню" type="button" onClick={toggleMobileMenu} className="header__account-menu-button" />
                </li>
              </ul>
            </nav>
            {isMobileMenuActive && <MobileMenu
              onAccountClick={onAccountClick}
              headerAccountIcon={headerAccountIcon}
              toggleMobileMenu={toggleMobileMenu}
            />}
          </div>
        </header>) : (
        <header className="header-unauthorized">
          <div className="header-unauthorized__menu">
            <button aria-label="лого-переход на: о проекте" type="button" onClick={onLogoClick} className="header-unauthorized__logo-button" />
            <button aria-label="регистрация" type="button" onClick={onRegisterClick} className="header-unauthorized__register-button">Регистрация</button>
            <button aria-label="войти" type="button" onClick={onLoginClick} className="header-unauthorized__login-button"><span className="header-unauthorized__login-button-text">Войти</span></button>
          </div>
        </header>
      )}
    </>
  );
}

export default Header;
