import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginRegisterPage.css';

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
}) {

  const navigate = useNavigate();

  function onLogoClick() {
    navigate('/', { replace: true });
  }

  return (
    <section className="login-register">
      <div className='login-register__img-container'>
        <button aria-label="лого-переход на: о проекте" type="button" onClick={onLogoClick} className="login-register__header-logo-button" />
      </div>
      <form onSubmit={onFormSubmit} name={`${formName}Form`} className={`${formName}__form`} noValidate>
        <h2 className='login-register__title'>{formTitle}</h2>
        {children}
        <button aria-label={`${formButtonText}`} type="submit" disabled={!isSubmitButtonActive} className={`login-register__button login-register__button_type_${formName} ${isSubmitButtonActive ? '' : 'login-register__button_disabled'}`}>{formButtonText}</button>
      </form>
      <div className={`${formName}__register-container register-container`}>
        <span className='register-container__signup-text'>{registerContainerSignupText}</span>
        <button aria-label={`${loginRegisterButtonText}`} type='button' onClick={onRegisterContainerSubmit} className='register-container__signup-button'>{loginRegisterButtonText}</button>
      </div>
    </section>
  );
}

export default LoginRegisterPage;
