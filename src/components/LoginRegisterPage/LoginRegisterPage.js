import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InfoToolTip from './../../components/InfoToolTip/InfoToolTip';

function LoginRegisterPage({
  onFormSubmit,
  formName,
  formTitle,
  isSubmitButtonActive,
  children,
  formButtonText,
  registerContainerSignupText,
  onRegisterContainerSubmit,
  loginRegisterButtonText,
  errorRequestMessage,
  isInfoMessageActive,
  hideErrorMessages,
  infoToolTipStyles,
}) {

  const [infoToolTipMessage, setInfoToolTipMessage] = useState('');
  const infoToolTipStyle = infoToolTipStyles;
  const infoToolTipTextStyle = "login-register__info-tool-tip-text";

  useEffect(() => {
    hideErrorMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (errorRequestMessage) {
      setInfoToolTipMessage(errorRequestMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorRequestMessage]);

  const navigate = useNavigate();
  function onLogoClick() {
    navigate('/', { replace: true });
  }

  return (
    <>
      <header className='login-register-header'>
        <button aria-label="лого-переход на: о проекте" type="button" onClick={onLogoClick} className="login-register-header__logo-button" />
      </header>
      <main>
        <section className="login-register">
          <form onSubmit={onFormSubmit} name={`${formName}Form`} className="login-register__form" noValidate>
            <h2 className='login-register__title'>{formTitle}</h2>
            {children}
            <InfoToolTip
              isActive={isInfoMessageActive}
              infoMessage={infoToolTipMessage}
              additionalInfoClassStyles={infoToolTipStyle}
              additionalInfotextStyles={infoToolTipTextStyle}
            />
            <button aria-label={`${formButtonText}`} type="submit" disabled={!isSubmitButtonActive} className={`login-register__button ${isSubmitButtonActive ? '' : 'login-register__button_disabled'}`}>{formButtonText}</button>
          </form>
        </section>
      </main>
      <footer className="login-register__footer">
        <div className="login-register__register-container register-container">
          <span className='register-container__signup-text'>{registerContainerSignupText}</span>
          <button aria-label={`${loginRegisterButtonText}`} type='button' onClick={onRegisterContainerSubmit} className='register-container__signup-button'>{loginRegisterButtonText}</button>
        </div>
      </footer>
    </>
  );
}

export default LoginRegisterPage;
