import '../pages/index.css';
import { Card } from '../scripts/components/Card.js';
import { Section } from '../scripts/components/Section.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import {validationConfig} from '../scripts/utils/validationConfig.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { PopupDeleteCard } from '../scripts/components/PopupDeleteCard.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import {
  buttonEditProfile,
  buttonAddCard,
  buttonEditAvatar,
  formEditProfile,
  formAddCard,
  formEditAvatar
} from '../scripts/utils/constants.js'
import { api } from '../scripts/components/Api.js'

function handleAddLike(card) {
  if(!card.hasMyLike()) {
    api.setLikeCard(card._cardID)
      .then(res => {card.setLikes(res)})
      .catch(err => {console.log('Ошибка:' + err)})
  } else {
    api.deleteLikeCard(card._cardID)
      .then(res => {card.setLikes(res)})
      .catch(err => {console.log('Ошибка:' + err)})
  }
}

function handleOpenPopupImage(name, url) {
  popupWithImage.open(name, url);
};

function handleOpenPopupDeleteCard(card) {
  popupDeleteCard.open(card);
};

function handleClickButtonEditProfile() {
  const userData = userInfo.getUserInfo();
  popupEditProfile.setInputValues(userData);
  formEditProfileValidator.resetFormElementValidationState();
  popupEditProfile.open();
};

function handleClickButtonAddCard() {
  formAddCardValidator.resetFormElementValidationState();
  popupAddCard.open();
};

function handleClickButtonEditAvatar(evt) {
  evt.preventDefault();
  formEditAvatarValidator.resetFormElementValidationState();
  popupEditAvatar.open();
};

function createCard(cardData, userID) {
  const card = new Card(userID, cardData, '.template', handleAddLike, handleOpenPopupImage, handleOpenPopupDeleteCard);
  const cardElement = card.generateCard();
  card.setLikes(cardData);
  return cardElement;
};

const userInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__img');

const cardList = new Section (
  (cardItem) => {
    cardList.addItem(createCard(cardItem, userInfo.getUserID()));
  },
  '.elements');

Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(res => {
  const [userRes, initialCardsRes] = res;
  userInfo.setUserInfo(userRes);
  userInfo.setUserAvatar(userRes);
  cardList.renderItems(initialCardsRes.reverse());
})
.catch(err => {console.log('Ошибка:' + err)});

//валидация форм
const formEditProfileValidator = new FormValidator(validationConfig, formEditProfile);
formEditProfileValidator.enableValidation();
const formAddCardValidator = new FormValidator(validationConfig, formAddCard);
formAddCardValidator.enableValidation();
const formEditAvatarValidator = new FormValidator(validationConfig, formEditAvatar);
formEditAvatarValidator.enableValidation();

//модальное окно с картинкой
const popupWithImage = new PopupWithImage ('.popup_type_image');
popupWithImage.setEventListeners();

//модальное окно Редактировать профиль
const popupEditProfile = new PopupWithForm(
  '.popup_type_form-editprofile',
  '.popup__form_edit',
  (inputValues) => {
    popupEditProfile.renderLoading(true, 'Сохранение...');
    api.setUserInfo(inputValues)
      .then(res => {
        userInfo.setUserInfo(res);
        popupEditProfile.close();
      })
      .catch(err => {console.log('Ошибка:' + err)})
      .finally(() => {popupEditProfile.renderLoading(false, 'Сохранить')});
  }
);
popupEditProfile.setEventListeners();

//модальное окно Добавить карточку
const popupAddCard = new PopupWithForm(
  '.popup_type_form-addcard',
  '.popup__form_add',
  (formData) => {
    popupAddCard.renderLoading(true, 'Сохранение...');
    api.setNewCard(formData)
      .then(res => {
        cardList.addItem(createCard(res, userInfo.getUserID()));
        popupAddCard.close();
      })
      .catch(err => {console.log('Ошибка:' + err)})
      .finally(() => {popupAddCard.renderLoading(false, 'Создать')});
  }
);
popupAddCard.setEventListeners();

//модальное окно Редактировать аватар
const popupEditAvatar = new PopupWithForm(
  '.popup_type_form-editavatar',
  '.popup__form_editavatar',
  (inputValue) => {
    popupEditAvatar.renderLoading(true, 'Сохранение...')
    api.setUserAvatar(inputValue)
      .then(res => {
        userInfo.setUserAvatar(res);
        popupEditAvatar.close();
      })
      .catch(err => {console.log('Ошибка:' + err)})
      .finally(() => {popupEditAvatar.renderLoading(false, 'Сохранить')});
  }
);
popupEditAvatar.setEventListeners();

//модальное окно Удаления карточки
const popupDeleteCard = new PopupDeleteCard(
  '.popup_type_delete-card',
  '.button_type_deleteCard',
  (card) => {
    api.setDeleteCard(card._cardID)
      .then(() => {
        card.deleteCard();
        popupDeleteCard.close();
      })
      .catch(err => {console.log('Ошибка:' + err)});
  }
)
popupDeleteCard.setEventListeners();

//слушатели событий
buttonEditProfile.addEventListener('click', handleClickButtonEditProfile);
buttonAddCard.addEventListener('click', handleClickButtonAddCard);
buttonEditAvatar.addEventListener('click', handleClickButtonEditAvatar);
