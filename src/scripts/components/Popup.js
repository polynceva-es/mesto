export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  };

  open() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popupElement.classList.add('popup_opened');
  };

  close() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popupElement.classList.remove('popup_opened');
  };

  //закрытие попапа клавишей Esc
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    };
  }

  setEventListeners() {
    this._buttonClose = this._popupElement.querySelector('.button_type_close');
    this._buttonClose.addEventListener('click', () => {this.close();});
    this._popupElement.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      };
    });
  };
}
