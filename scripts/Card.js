export class Card {
  constructor (object, templateSelector, openPopup) {
    this._caption = object.name;
    this._image = object.url;
    this._templateSelector = templateSelector;
    this._openPopup = openPopup;
  }
//получение разметки темплейт тега карточки
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }
//генерация карточки
  generateCard() {
    this._cardElement = this._getTemplate();
    this._setEventListeners();
    this._cardElement.querySelector('.card__image').src = this._image;
    this._cardElement.querySelector('.card__image').alt = this._caption;
    this._cardElement.querySelector('.card__caption').textContent = this._caption;
    return this._cardElement;
  }
//установка слушателей событий
  _setEventListeners() {
    this._cardElement.querySelector('.button_type_like').addEventListener('click', () => {this._addLike()});
    this._cardElement.querySelector('.button_type_delete').addEventListener('click', () => {this._deleteCard()});
    this._cardElement.querySelector('.card__image').addEventListener('click', () => {this._openPopupWithImage()});
  }
//обработчики событий:
//лайк
  _addLike() {
    this._cardElement.querySelector('.button_type_like').classList.toggle('button_active');
  }
//удаление карточки
  _deleteCard() {
    this._cardElement.remove();
  }
//открытие модального окна с картинкой
  _openPopupWithImage() {
  const popupImage = document.querySelector('.popup_type_image');
  const popupImageElement = popupImage.querySelector('.popup__image');
  const popupFigcaptionElement = popupImage.querySelector('.popup__figcaption');
  popupImageElement.src = this._image;
  popupImageElement.alt = this._caption;
  popupFigcaptionElement.textContent = this._caption;
  this._openPopup(popupImage);
  }
}
