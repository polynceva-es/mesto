import { Popup } from "./Popup.js";

export class PopupDeleteCard extends Popup {
  constructor(popupSelector, buttonSelector, handleSubmitDelete){
    super(popupSelector);
    this._button = document.querySelector(buttonSelector);
    this._handleSubmitDelete = handleSubmitDelete;
  }

  open(card){
    this._card = card;
    console.log(this._card)
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener('click', () => {this._handleSubmitDelete(this._card)})
  }
}
