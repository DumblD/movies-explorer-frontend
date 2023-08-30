import React from 'react';

function Footer({
  additionalFooterStyles,
}) {
    const additionalStyles = typeof additionalFooterStyles === "undefined" ? false : additionalFooterStyles;
  return (
    <footer className={`footer ${additionalStyles ? additionalStyles : ''}`}>
      <p className="footer__study-project-text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <ul className='footer__list-items'>
        <li className="footer__copyright">&copy; 2023. Артем Зинин</li>
        <li className="footer__yandex-practicum">Яндекс.Практикум</li>
        <li className="footer__github">Github</li>
      </ul>
    </footer>
  );
}

export default Footer;
