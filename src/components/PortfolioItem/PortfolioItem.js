import React from 'react';

function PortfolioItem({
  link,
  linkName,
  itemClassName,
}) {

  return (
    <li className={`portfolio__item ${itemClassName}`}>
      <a href={link} className="portfolio__link">
        {linkName}
        <div className="portfolio__link-icon" />
      </a>
    </li>
  );
}

export default PortfolioItem;
