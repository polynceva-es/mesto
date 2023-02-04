import '../pages/index.css';
import { Card } from '../scripts/components/Card.js';
import { Section } from '../scripts/components/Section.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import {validationConfig} from '../scripts/utils/validationConfig.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
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

function createCard(CardData) {
  const card = new Card(CardData, '.template', handleOpenPopupImage);
  const cardElement = card.generateCard();
  return cardElement;
};

function handleOpenPopupImage(name, url) {
  popupWithImage.open(name, url);
};

//получение информации о пользователе с страницы
const userInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__img');
api.getUserInfoFromServer()
  .then(res => {userInfo.setUserInfo(res);
  userInfo.setUserAvatar(res);
  });


//отрисовка стартовых карточек на странице

const cardList = new Section (
  (cardItem) => {
    cardList.addItem(createCard(cardItem));
  }
  , '.elements');
api.getInitialCards()
  .then(res => {cardList.renderItems(res)})

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
    api.setUserInfoToServer(inputValues)
      .then(res => {userInfo.setUserInfo(res)})
    popupEditProfile.close()
  }
);
popupEditProfile.setEventListeners();

//модальное окно Добавить карточку
const popupAddCard = new PopupWithForm(
  '.popup_type_form-addcard',
  '.popup__form_add',
  (formData) => {
    cardList.addItem(createCard(formData));
    popupAddCard.close();
  }
);
popupAddCard.setEventListeners();

//модальное окно Редактировать аватар
const popupEditAvatar = new PopupWithForm(
  '.popup_type_form-editavatar',
  '.popup__form_editavatar',
  (inputValue) => {
    api.setUserAvatartoServer(inputValue)
      .then(res => userInfo.setUserAvatar(res));
    popupEditAvatar.close();
  }
);
popupEditAvatar.setEventListeners();


//слушатели событий
buttonEditProfile.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  popupEditProfile.setInputValues(userData);
  formEditProfileValidator.resetFormElementValidationState();
  popupEditProfile.open();
});

buttonAddCard.addEventListener('click', () => {
  formAddCardValidator.resetFormElementValidationState();
  popupAddCard.open();
});

buttonEditAvatar.addEventListener('click', (evt) => {
  evt.preventDefault();
  formEditAvatarValidator.resetFormElementValidationState();
  popupEditAvatar.open();
})
