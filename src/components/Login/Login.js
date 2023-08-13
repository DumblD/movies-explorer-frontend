import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { useFormAndValidation } from './../../utils/customHooks/useFormAndValidation';
import FormInput from './../FormInput/FormInput';
import LoginRegisterPage from './../LoginRegisterPage/LoginRegisterPage';

function Login() {

  const inputLabels = [
    {
      name: "E-mail",
    },
    {
      name: "Пароль",
    },
  ]

  // resetForm will be used later
  // eslint-disable-next-line no-unused-vars
  const { values, handleChange, errors, isInputValid, resetForm, isSubmitButtonActive, getInputNames } = useFormAndValidation();
  const inputElements = [
    {
      id: 1,
      type: "email",
      name: "loginEmail",
      className: "login__input login__input_el_login-email",
      required: true,
      placeholder: ""
    },
    {
      id: 2,
      type: "password",
      name: "loginPassword",
      className: "login__input login__input_el_login-password",
      required: true,
      placeholder: "",
      minLength: "7",
    }
  ];
  const nameInputs = getInputNames(inputElements);
  const navigate = useNavigate();
  const formName = 'login';
  const formTitle = 'Рады видеть!';
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
    // loginData will be used later
    // eslint-disable-next-line no-unused-vars
    const loginData = gatherLoginData();
    // ...
  }

  function handleSignUp() {
    navigate('/signup', { replace: true });
  }

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
    >
      {
        inputElements.map((input, index) => (
          <FormInput key={input.id}
            {...input}
            labelForAttribute={input.name}
            labelName={inputLabels[index].name}
            inputId={input.name}
            value={values[input.name] || ""}
            inputElement={input}
            isInputValid={isInputValid[input.name]}
            errorMessageText={errors[input.name]}
            onChange={handleChange} />
        ))
      }
    </LoginRegisterPage>
  );
}

export default Login;
