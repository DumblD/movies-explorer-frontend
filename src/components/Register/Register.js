import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormAndValidation } from './../../utils/customHooks/useFormAndValidation';
import FormInput from './../FormInput/FormInput';
import LoginRegisterPage from './../LoginRegisterPage/LoginRegisterPage';

function Register({
  onRegister,
  isSubmitLoading,
  isReadOnly,
  errorRequestMessage,
  isInfoMessageActive,
  hideErrorMessages,
}) {
  const infoToolTipStyles = "login-register__info-tool-tip login-register__info-tool-tip_type_register";
  const inputLabels = [
    {
      name: "Имя",
    },
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
      type: "text",
      name: "registerName",
      className: "login-register__input login-register__input_el_register-name",
      required: true,
      placeholder: "",
      minLength: "2",
      maxLength: "30",
      // eslint-disable-next-line no-useless-escape
      pattern: '^[а-яА-ЯёЁa-zA-Z\\- ]+$',
      title: "Используйте только латиницу, кириллицу, пробелы или дефисы"
    },
    {
      id: 2,
      type: "email",
      name: "registerEmail",
      className: "login-register__input login-register__input_el_register-email",
      required: true,
      placeholder: "",
      // eslint-disable-next-line no-useless-escape
      pattern: "[^@]+@[^\.]+\\.[^\.]+[a-zA-Z]{1,4}",
      title: "email@example.ru",
    },
    {
      id: 3,
      type: "password",
      name: "registerPassword",
      className: "login-register__input login-register__input_el_register-password",
      required: true,
      placeholder: "",
      pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{7,}$",
      title: "Пароль должен содержать как минимум одну цифру, одну заглавную и одну строчную буквы. Минимальная длина 7 символов."
    }
  ];
  const nameInputs = getInputNames(inputElements);
  const clearInputs = () => {
    resetForm();
  }
  const navigate = useNavigate();
  const sectionClassName = "login-register";
  const formName = 'register';
  const formTitle = 'Добро пожаловать!';
  const labelClassName = 'login-register__label';
  const formButtonText = 'Зарегистрироваться';
  const loginRegisterButtonText = "Войти";
  const registerContainerSignupText = 'Уже зарегистрированы?';
  const registerData = {
    name: null,
    email: null,
    password: null
  }
  const loginData = {
    email: null,
    password: null
  }

  // функция, формирующая данные для последующего обращения с ними на сервер
  function gatherRegisterData() {
    for (const key in registerData) {
      nameInputs.forEach((el) => {
        if (el.toLowerCase().includes(key.toString())) {
          registerData[key] = values[el];
        }
      })
    }
    return registerData;
  }

  function gatherLoginData() {
    for (const key in registerData) {
      if (key !== 'name') {
        loginData[key] = registerData[key];
      }
    }
    return loginData;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    hideErrorMessages();
    const registerData = gatherRegisterData();
    const loginData = gatherLoginData();
    onRegister(registerData, loginData, clearInputs);
  }

  function handleSignIn() {
    navigate('/signin', { replace: true });
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
      onRegisterContainerSubmit={handleSignIn}
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
            readOnly={isReadOnly} />
        ))
      }
    </LoginRegisterPage>
  );
}

export default Register;
