import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
    this._popupImageElement = this._popupElement.querySelector('.popup__image');
    this._popupFigcaptionElement =this._popupElement.querySelector('.popup__figcaption');
  };

  open(title, url) {
    this._popupImageElement.src = url;
    this._popupImageElement.alt = title;
    this._popupFigcaptionElement.textContent = title;
    super.open();
  };
}
