import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormAndValidation } from './../../utils/customHooks/useFormAndValidation';
import FormInput from './../FormInput/FormInput';
import LoginRegisterPage from './../LoginRegisterPage/LoginRegisterPage';

function Register() {

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
  // resetForm will be used later
  // eslint-disable-next-line no-unused-vars
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
    },
    {
      id: 2,
      type: "email",
      name: "registerEmail",
      className: "login-register__input login-register__input_el_register-email",
      required: true,
      placeholder: ""
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
  const navigate = useNavigate();
  const sectionClassName = "login-register";
  const formName = 'register';
  const formTitle = 'Добро пожаловать!';
  const labelClassName = 'login-register__label';
  const formButtonText = 'Зарегистрироваться';
  const loginRegisterButtonText = "Войти";
  const registerContainerSignupText = 'Уже зарегистрированы?';
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

  function handleSignIn() {
    navigate('/signin', { replace: true });
  }

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
            onChange={handleChange} />
        ))
      }
    </LoginRegisterPage>
  );
}

export default Register;
