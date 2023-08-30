import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormAndValidation } from './../../utils/customHooks/useFormAndValidation';
import FormInput from './../FormInput/FormInput';
import LoginRegisterPage from './../LoginRegisterPage/LoginRegisterPage';

function Login({
  onLogin,
  isSubmitLoading,
  isReadOnly,
  errorRequestMessage,
  isInfoMessageActive,
  hideErrorMessages,
}) {
  const infoToolTipStyles = "login-register__info-tool-tip login-register__info-tool-tip_type_login";
  const readOnlyInputClassName = "login-register__input_type_disabled";
  const inputLabels = [
    {
      name: "E-mail",
    },
    {
      name: "Пароль",
    },
  ]

  const { values, handleChange, errors, isInputValid, resetForm, isSubmitButtonActive, getInputNames } = useFormAndValidation();
  const inputElements = [
    {
      id: 1,
      type: "email",
      name: "loginEmail",
      className: "login-register__input login-register__input_el_login-email",
      required: true,
      placeholder: "",
      // eslint-disable-next-line no-useless-escape
      pattern: "[^@]+@[^\.]+\\.[^\.]+[a-zA-Z]{1,4}",
      title: "email@example.ru",
    },
    {
      id: 2,
      type: "password",
      name: "loginPassword",
      className: "login-register__input login-register__input_el_login-password",
      required: true,
      placeholder: "",
      minLength: "7",
    }
  ];
  const nameInputs = getInputNames(inputElements);
  const navigate = useNavigate();
  const clearInputs = () => {
    resetForm();
  }
  const sectionClassName = "login-register";
  const formName = 'login';
  const formTitle = 'Рады видеть!';
  const labelClassName = 'login-register__label';
  const formButtonText = 'Войти';
  const loginRegisterButtonText = 'Регистрация';
  const registerContainerSignupText = 'Ещё не зарегистрированы?';
  const loginData = {
    password: null,
    email: null
  }

  // функция, формирующая данные для последующего обращения с ними на сервер
  function gatherLoginData() {
    for (const key in loginData) {
      nameInputs.forEach((el) => {
        if (el.toLowerCase().includes(key.toString())) {
          loginData[key] = values[el];
        }
      })
    }
    return loginData;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    hideErrorMessages();
    const loginData = gatherLoginData();
    onLogin(loginData, clearInputs);
  }

  function handleSignUp() {
    navigate('/signup', { replace: true });
  }

  useEffect(() => {
    const isAuthorized = localStorage.getItem('isAuthorized');
    if (isAuthorized) {
      navigate('/', { replace: true });
    }
    hideErrorMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LoginRegisterPage
      onFormSubmit={handleSubmit}
      formName={formName}
      formTitle={formTitle}
      isSubmitButtonActive={isSubmitButtonActive}
      formButtonText={formButtonText}
      registerContainerSignupText={registerContainerSignupText}
      onRegisterContainerSubmit={handleSignUp}
      loginRegisterButtonText={loginRegisterButtonText}
      errorRequestMessage={errorRequestMessage}
      isInfoMessageActive={isInfoMessageActive}
      hideErrorMessages={hideErrorMessages}
      infoToolTipStyles={infoToolTipStyles}
      isSubmitLoading={isSubmitLoading}
    >
      {
        inputElements.map((input, index) => (
          <FormInput key={input.id}
            {...input}
            sectionClassName={sectionClassName}
            labelForAttribute={input.name}
            labelName={inputLabels[index].name}
            labelClassName={labelClassName}
            inputId={input.name}
            value={values[input.name] || ""}
            inputElement={input}
            isInputValid={isInputValid[input.name]}
            errorMessageText={errors[input.name]}
            onChange={handleChange}
            readOnlyInputClassName={readOnlyInputClassName}
            readOnly={isReadOnly} />
        ))
      }
    </LoginRegisterPage>
  );
}

export default Login;
