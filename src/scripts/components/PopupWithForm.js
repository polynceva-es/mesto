import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor (popupSelector, formSelector, handleSubmitForm) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector(formSelector);
    this._inputList = this._formElement.querySelectorAll('.popup__input');
    this._handleSubmitForm = handleSubmitForm;
  };

  //собрать данные всех полей формы
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => { this._formValues[input.name] = input.value; });
    return this._formValues;
  };

  //устанавить значения со страницы в поля формы
  setInputValues(inputValues) {
    this._inputList.forEach((input) => {
      if (inputValues[input.name]) {
        input.value = inputValues[input.name];
      }
    });
  }

  setEventListeners() {
    super.setEventListeners();
      this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
  };

  close() {
    super.close();
    this._formElement.reset();
  };
}
