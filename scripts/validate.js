/*formElement - <form> - html-элемент формы, в котором находится проверяемое поле ввода
  inputElement - <input> - проверяемое поле ввода
  errorElement - <span> - поле с текстом ошибки  под полем ввода*/

  //функция показать ошибку в инпуте
  function showInputError(formElement, inputElement, settings) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(`${settings.inputErrorClass}`);
    errorElement.classList.add(`${settings.errorClass}`);
    errorElement.textContent = inputElement.validationMessage;
  };

  //функция скрыть ошибку в инпуте
  function hideInputError(formElement, inputElement, settings) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(`${settings.inputErrorClass}`);
    errorElement.classList.remove(`${settings.errorClass}`);
    errorElement.textContent = '';
  };

  //функция проверить валидность поля
  function checkInputValid(formElement, inputElement, settings) {
    if(!inputElement.validity.valid) {
      showInputError (formElement, inputElement, settings);
    } else {
      hideInputError (formElement, inputElement, settings);
    };
  };

  //функция проверки всех полей на валидность(возвращает true(если хотябы одно поле не валидно) или false(если все поля валидны))
  function checkAllInputValid(inputList) {
    return inputList.some(function(inputElement) {
      return !inputElement.validity.valid;
    });
  };

  //функция стилизации кнопки (делает кнопку не/активной)
  function disabledButtonSubmit(inputList, buttonElement, settings) {
    if(checkAllInputValid(inputList)) {
      buttonElement.classList.add(`${settings.inactiveButtonClass}`);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(`${settings.inactiveButtonClass}`);
      buttonElement.removeAttribute('disabled');
    };
  };

  //функция добавления обработчиков событий всем полям формы
  function setEventListeners(formElement, settings) {
    const inputList = Array.from(formElement.querySelectorAll(`${settings.inputSelector}`));
    const buttonElement = formElement.querySelector(`${settings.submitButtonSelector}`);
    disabledButtonSubmit(inputList, buttonElement, settings);
    inputList.forEach(function(inputElement) {
      inputElement.addEventListener('input', function(){
        checkInputValid(formElement, inputElement, settings);
        disabledButtonSubmit(inputList, buttonElement, settings);
      });
    });
  };

  //функция добавления обработчиков событий всем формам
  function enableValidation(settings) {
    const formList = Array.from(document.querySelectorAll(`${settings.formSelector}`));
    formList.forEach(function(formElement) {
      formElement.addEventListener('submit', function(evt) {
        evt.preventDefault();
      });
      setEventListeners(formElement, settings);
    });
  };

  //функция удаления ошибок валидации
  function removeValidationErrors (formPopup, inputList, validationConfig) {
    inputList.forEach(function(inputElement) {
      hideInputError(formPopup, inputElement, validationConfig);
    });
  };

  const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.button_type_submit',
    inactiveButtonClass: 'button_type_submit-error',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_true'
  };

//найдем на странице все формы, вызовем функцию валидации форм
enableValidation(validationConfig);



