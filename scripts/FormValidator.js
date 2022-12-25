/*formElement - <form> - html-элемент формы, в котором находится проверяемое поле ввода
  inputElement - <input> - проверяемое поле ввода
  errorElement - <span> - поле с текстом ошибки  под полем ввода*/

export class FormValidator {
  constructor(object, formElement) {
    this._inputSelector = object.inputSelector;
    this._submitButtonSelector = object.submitButtonSelector;
    this._inactiveButtonClass = object.inactiveButtonClass;
    this._inputErrorClass = object.inputErrorClass;
    this._errorClass = object.errorClass;
    this._formElement = formElement;
  }

 //функция показать ошибку в инпуте
_showInputError(inputElement) {
  const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(this._inputErrorClass);
  errorElement.classList.add(this._errorClass);
  errorElement.textContent = inputElement.validationMessage;
};

//функция скрыть ошибку в инпуте
_hideInputError(inputElement) {
  const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(this._inputErrorClass);
  errorElement.classList.remove(this._errorClass);
  errorElement.textContent = '';
};

//функция проверить валидность поля
_checkInputValid(inputElement) {
  if(!inputElement.validity.valid) {
    this._showInputError (inputElement);
  } else {
    this._hideInputError (inputElement);
  };
};

//функция проверки всех полей на валидность(возвращает true(если хотябы одно поле не валидно) или false(если все поля валидны))
_checkAllInputValid() {
  return this._inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//функция стилизации кнопки (делает кнопку не/активной)
_toggleButtonSubmitState() {
  if(this._checkAllInputValid()) {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  } else {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
  };
};

//функция добавления обработчиков событий всем полям формы
_setEventListeners() {
  this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  this._toggleButtonSubmitState();
  this._inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this._checkInputValid(inputElement);
      this._toggleButtonSubmitState();
    });
  });
};

//функция добавления обработчиков событий всем формам
enableValidation() {
  this._setEventListeners();
};

//функция удаления ошибок валидации
_removeValidationErrors () {
  this._inputList.forEach((inputElement) => {
    this._hideInputError(inputElement);
  });
};

//функция сброса ошибок
resetFormElementValidationState() {
  this._removeValidationErrors();
  this._toggleButtonSubmitState();
};
}
