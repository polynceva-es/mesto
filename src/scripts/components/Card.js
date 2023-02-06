export class Card {
  constructor (userID, cardData, templateSelector, handleAddLike, handleOpenPopup, handleOpenPopupDeleteCard) {
    this._userID = userID;
    this._caption = cardData.name;
    this._imageLink = cardData.link;
    this._ownerCardID = cardData.owner._id;
    this._cardID = cardData._id;
    this._templateSelector = templateSelector;
    this.handleAddLike = handleAddLike
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
    this._buttonDelete = this._cardElement.querySelector('.button_type_delete');
    this._buttonLike = this._cardElement.querySelector('.button_type_like');
    this._likeNumConteiner = this._cardElement.querySelector('.card__like_num');
    this._buttonLike = this._cardElement.querySelector('.button_type_like');
    this._likeNumConteiner = this._cardElement.querySelector('.card__like_num');
    this._setEventListeners();
    this._cardImage.src = this._imageLink;
    this._cardImage.alt = this._caption;
    this._cardCaption.textContent = this._caption;
    if(!(this._userID === this._ownerCardID)) {this._buttonDelete.classList.add('button_none')};
    return this._cardElement;
  }

  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {this.handleAddLike(this)});
    this._buttonDelete.addEventListener('click', () => {this.handleOpenPopupDeleteCard(this);});
    this._cardImage.addEventListener('click', () => {this.handleOpenPopup(this._caption, this._imageLink)});
  }

  setLikes(cardData) {
    this._likes = cardData.likes;
    this._likeNum = this._likes.length;
    this._likeNumConteiner.textContent = this._likeNum;
    this._hasMyLike = false;
    for(let i=0; i < this._likeNum; i++) {
      if(this._likes[i]._id === this._userID) {
        this._hasMyLike = true;
        break;
      }
    }
    if (this._hasMyLike) {
      this._buttonLike.classList.add('button_active');
    } else {
      this._buttonLike.classList.remove('button_active');
    }
  }


  hasMyLike() {
    return this._hasMyLike;

  }

  deleteCard() {
    this._cardElement.remove();
  }
}
