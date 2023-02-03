export class Card {
  constructor (cardData, templateSelector, handleOpenPopup) {
    this._caption = cardData.name;
    this._imageLink = cardData.link;
    this._templateSelector = templateSelector;
    this.handleOpenPopup = handleOpenPopup;
  }
//получение разметки темплейт тега карточки
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }
//генерация карточки
  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector('.card__image');
    this._cardCaption = this._cardElement.querySelector('.card__caption');
    this._buttonLike = this._cardElement.querySelector('.button_type_like');
    this._buttonDelete = this._cardElement.querySelector('.button_type_delete');
    this._setEventListeners();
    this._cardImage.src = this._imageLink;
    this._cardImage.alt = this._caption;
    this._cardCaption.textContent = this._caption;
    return this._cardElement;
  }
//установка слушателей событий
  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {this._addLike()});
    this._buttonDelete.addEventListener('click', () => {this._deleteCard()});
    this._cardImage.addEventListener('click', () => {this.handleOpenPopup(this._caption, this._imageLink)});
  }
//обработчики событий:
//лайк
  _addLike() {
    this._buttonLike.classList.toggle('button_active');
  }
//удаление карточки
  _deleteCard() {
    this._cardElement.remove();
  }
}
