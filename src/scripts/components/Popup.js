export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  };

  openPopup() {
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    this._popupElement.classList.add('popup_opened');
  };

  closePopup() {
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
    this._popupElement.classList.remove('popup_opened');
  };

  //закрытие попапа клавишей Esc
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
    };
  }

  setEventListeners() {
    this._buttonClose = this._popupElement.querySelector('.button_type_close');
    this._buttonClose.addEventListener('click', () => {this.closePopup();});
    this._popupElement.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.closePopup();
      };
    });
  };
}
