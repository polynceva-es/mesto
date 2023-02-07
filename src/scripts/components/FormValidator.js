/*formElement - <form> - html-элемент формы, в котором находится проверяемое поле ввода
  inputElement - <input> - проверяемое поле ввода
  errorElement - <span> - поле с текстом ошибки  под полем ввода*/

export class FormValidator {
  constructor(validationConfig, formElement) {
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;
    this._formElement = formElement;
  }

  //показать ошибку в инпуте
  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
  };

  //скрыть ошибку в инпуте
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  //проверить валидность поля
  _checkInputValid(inputElement) {
    if(!inputElement.validity.valid) {
      this._showInputError (inputElement);
    } else {
      this._hideInputError (inputElement);
    };
  };

  //проверить все поля на валидность(возвращает true(если хотябы одно поле не валидно) или false(если все поля валидны))
  _checkAllInputValid() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  //стилизация кнопки (делает кнопку не/активной)
  _toggleButtonSubmitState() {
    if(this._checkAllInputValid()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    };
  };

  //добавить обработчики событий всем полям формы
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

  //добавить обработчики событий всем формам
  enableValidation() {
    this._setEventListeners();
  };

  //удалить ошибки валидации
  _removeValidationErrors () {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  };

  //сбросить ошибки
  resetFormElementValidationState() {
    this._removeValidationErrors();
    this._toggleButtonSubmitState();
  };
}
