export class Card {
  constructor (cardData, templateSelector, handleOpenPopup, handleOpenPopupDeleteCard) {
    this._caption = cardData.name;
    this._imageLink = cardData.link;
    this._likeNum = cardData.likes.length;
    this._ownerCardID = cardData.owner._id;
    this._cardID = cardData._id;
    this._templateSelector = templateSelector;
    this.handleOpenPopup = handleOpenPopup;
    this.handleOpenPopupDeleteCard = handleOpenPopupDeleteCard;
  }
//получение разметки темплейт тега карточки
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }
//генерация карточки
  generateCard(userID) {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector('.card__image');
    this._cardCaption = this._cardElement.querySelector('.card__caption');
    this._buttonLike = this._cardElement.querySelector('.button_type_like');
    this._likeNumConteiner = this._cardElement.querySelector('.card__like_num');
    this._buttonDelete = this._cardElement.querySelector('.button_type_delete');
    this._setEventListeners();
    this._cardImage.src = this._imageLink;
    this._cardImage.alt = this._caption;
    this._cardCaption.textContent = this._caption;
    this._likeNumConteiner.textContent = this._likeNum;
    if(!(userID === this._ownerCardID)) {this._buttonDelete.classList.add('button_none')};
    return this._cardElement;
  }
//установка слушателей событий
  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {this._addLike()});
    this._buttonDelete.addEventListener('click', () => {this.handleOpenPopupDeleteCard(this);});
    this._cardImage.addEventListener('click', () => {this.handleOpenPopup(this._caption, this._imageLink)});
  }
//обработчики событий:
//лайк
  _addLike() {
    this._buttonLike.classList.toggle('button_active');
  }
//удаление карточки
  deleteCard() {
    this._cardElement.remove();
  }
}
