import { api } from '../components/Api.js'
export class Card {
  constructor (userID, cardData, templateSelector, handleOpenPopup, handleOpenPopupDeleteCard) {
    this.userID = userID;
    this._caption = cardData.name;
    this._imageLink = cardData.link;
    this._likes = cardData.likes;
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
  generateCard() {
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
    if(!(this.userID === this._ownerCardID)) {this._buttonDelete.classList.add('button_none')};
    return this._cardElement;
  }
//установка слушателей событий
  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {this.addLike()});
    this._buttonDelete.addEventListener('click', () => {this.handleOpenPopupDeleteCard(this);});
    this._cardImage.addEventListener('click', () => {this.handleOpenPopup(this._caption, this._imageLink)});
  }
//обработчики событий:
//лайк
  addLike() {
    console.log(this._likes)
    console.log(this.userID)
    this._likes.forEach((like) => {
      if(like._id === this.userID) {
        console.log('Ты уже лайкала эту карточку');
      api.getLikeCardFromServer(this._cardID)
        .then(this._buttonLike.classList.remove('button_active'))
      } else {
        console.log('Ты еще не лайкала эту карточку');
      api.setLikeCardToServer(this._cardID)
        .then(this._buttonLike.classList.add('button_active'))
      }
    })
  }

//удаление карточки
  deleteCard() {
    this._cardElement.remove();
  }
}
