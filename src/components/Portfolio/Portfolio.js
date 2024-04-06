import React from 'react';
import PortfolioItem from './../PortfolioItem/PortfolioItem';

function Portfolio() {

  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <PortfolioItem
          link={"https://how-to-learn.byethost16.com/"}
          linkName={"Статичный сайт"}
          itemClassName={"portfolio__item-static-site"}
        />
        <PortfolioItem
          link={"https://dumbld.github.io/travel-project/"}
          linkName={"Адаптивный сайт"}
          itemClassName={"portfolio__item-adaptive-site"}
        />
        <PortfolioItem
          link={"https://mesto-project.xyz/"}
          linkName={"SPA Mesto"}
          itemClassName={"portfolio__item-single-page-application"}
        />
        <PortfolioItem
          link={"https://movies-explorer.xyz/"}
          linkName={"SPA Movies explorer"}
          itemClassName={"portfolio__item-single-page-application"}
        />
      </ul>
    </section>
  );
}

export default Portfolio;
