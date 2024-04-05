import React from 'react';
import Navigation from './../../components/Navigation/Navigation';

function MobileMenu({
  onAccountClick,
  headerAccountIcon,
  toggleMobileMenu,
}) {

  const isMobileMenu = true;

  const handleOverlayMenuClose = (e) => {
    if (e.target === e.currentTarget) {
      toggleMobileMenu();
    }
  }

  return (
    <div onClick={handleOverlayMenuClose} className="header__mobile-menu-layout">
      <div className="header__mobile-menu mobile-menu">
        <button aria-label="мобильное меню-закрыть" type="button" onClick={toggleMobileMenu} className="mobile-menu__close-button" />
        <nav className="mobile-menu__menu">
          <ul className="mobile-menu__menu-links">
            <Navigation isMobileMenu={isMobileMenu} />
            <li>
              <button aria-label="аккаунт" type='button' onClick={onAccountClick} className='mobile-menu__account-button'>
                <img className='mobile-menu__account-button-icon' src={headerAccountIcon} alt='аккаунт-лого' />
                <span className='mobile-menu__account-button-text'>Аккаунт</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default MobileMenu;
