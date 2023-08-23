import React, { useEffect } from 'react';
import Header from './../Header/Header';
import Promo from './../Promo/Promo';
import NavTab from './../NavTab/NavTab';
import AboutProject from './../AboutProject/AboutProject';
import Techs from './../Techs/Techs';
import AboutMe from './../AboutMe/AboutMe';
import Portfolio from './../Portfolio/Portfolio';
import Footer from './../Footer/Footer';

function Main({
  loggedIn,
  hideErrorMessages,
}) {

  useEffect(() => {
    hideErrorMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page__container">
      <Header loggedIn={loggedIn} isMainPage={true} />
      <main>
        <Promo />
        <NavTab />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </div>
  );
}

export default Main;
