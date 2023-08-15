import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormAndValidation } from './../../utils/customHooks/useFormAndValidation';
import Header from './../../components/Header/Header';
import FormInput from './../FormInput/FormInput';

function Profile({
  onLogout,
}) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({
    profileName: 'Виталий',
    profileEmail: 'pochta@yandex.ru',
  });
  const [isEditing, setIsEditing] = useState('nameField');
  const [profileName, setProfileName] = useState('');
  const [profileEmail, setProfileEmail] = useState('');
  const [inputErrorMessageText, setInputErrorMessageText] = useState('');

  const [isProfileChanged, setIsProfileChanged] = useState(false);
  // resetForm will be used later
  // eslint-disable-next-line no-unused-vars
  const { values, handleChange, errors, isInputValid, setValues, resetForm, isSubmitButtonActive, setIsSubmitButtonActive, getInputNames } = useFormAndValidation();

  const inputLabels = [
    {
      name: "Имя",
    },
    {
      name: "E-mail",
    },
  ]

  const inputElements = [
    {
      id: 1,
      type: "text",
      name: "profileName",
      className: "profile__input profile__input_el_profileName",
      required: true,
      placeholder: ""
    },
    {
      id: 2,
      type: "email",
      name: "profileEmail",
      className: "profile__input profile__input_el_profileEmail",
      required: true,
      placeholder: ""
    },
  ];

  const sectionClassName = "profile";
  const labelClassName = "profile__label";

  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);

  const inputRefs = {
    profileName: nameInputRef,
    profileEmail: emailInputRef,
  }

  function setValuesToInputs() {
    setValues({ ...values, profileName: profileName, profileEmail: profileEmail });
  }

  useEffect(() => {
    setIsSubmitButtonActive(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const inputError = getInputError();
    setInputErrorMessageText(inputError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  useEffect(() => {
    setProfileName(currentUser.profileName);
    setProfileEmail(currentUser.profileEmail);
    setValuesToInputs();
    setIsProfileChanged(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileName, profileEmail, currentUser]);

  useEffect(() => {
    if (values.profileName !== profileName ||
      values.profileEmail !== profileEmail) {
      setIsProfileChanged(true);
    } else {
      setIsProfileChanged(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.profileName, values.profileEmail]);

  function onSaveSubmit(ev) {
    ev.preventDefault();
    setCurrentUser({ ...currentUser, profileName: values.profileName, profileEmail: values.profileEmail })
    setProfileName(values.profileName);
    setProfileEmail(values.profileEmail);
  }

  function onEdit(ev) {
    ev.preventDefault();
    if (isEditing === 'nameField') {
      nameInputRef.current.focus();
      setIsEditing('emailField');
    }
    if (isEditing === 'emailField') {
      emailInputRef.current.focus();
      setIsEditing('nameField');
    }
  }

  function handleLogout(ev) {
    ev.preventDefault();
    onLogout();
    navigate('/', { replace: true });
  }

  function getInputError() {
    let errorInputName;
    const inputsNames = getInputNames(inputElements);
    const isError = inputsNames.some((el) => {
      if (errors[el]) {
        errorInputName = el;
      }
      return errors[el];
    });
    if (!isError) {
      return '';
    }
    return errors[errorInputName];
  }

  return (
    <>
      <Header />
      <section className='profile'>
        <form name="profileEditForm" className='profile__form' onSubmit={onSaveSubmit}>
          <h2 className="profile__title">Привет, {currentUser.profileName}!</h2>
          <span className='profile__line'></span>
          {
            inputElements.map((input, index) => (
              <FormInput key={input.id}
                {...input}
                sectionClassName={sectionClassName}
                labelForAttribute={input.name}
                labelName={inputLabels[index].name}
                inputId={input.name}
                value={values[input.name] || ""}
                inputElement={input}
                isInputValid={isInputValid[input.name]}
                errorMessageText={errors[input.name]}
                onChange={handleChange}
                inputRef={inputRefs[input.name]}
                labelClassName={labelClassName}
                isNoSpanErrors={true}
              />
            ))
          }
          <span className="profile__input-span-error">{inputErrorMessageText}</span>
          {!isProfileChanged && <button aria-label="редактировать" type="button" onClick={onEdit} className="profile__edit-button">Редактировать</button>}
          {isProfileChanged && <button aria-label="сохранить" type="submit" disabled={!isSubmitButtonActive} className={`profile__save-button ${isSubmitButtonActive ? '' : 'profile__save-button_disabled'}`}>Сохранить</button>}
        </form>
        {!isProfileChanged && <button aria-label="выйти из аккаунта" type="button" onClick={handleLogout} className="profile__logout-button">Выйти из аккаунта</button>}
      </section>
    </>
  );
}

export default Profile;
