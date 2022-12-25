import { Card } from './Card.js';
import { initialCards } from "./initialCards.js";
import { FormValidator } from './FormValidator.js';
import {validationConfig} from './validationConfig.js';

//секция с карточками
const elementsSection = document.querySelector('.elements');
//модальные окна
const popupEditProfile = document.querySelector('.popup_type_form-editprofile');
const popupAddCard = document.querySelector('.popup_type_form-addcard');
const popupImage = document.querySelector('.popup_type_image');
//формы
const formEditProfile = popupEditProfile.querySelector('.popup__form_edit');
const formAddCard = popupAddCard.querySelector('.popup__form_add');
//инпуты
const inputName = formEditProfile.querySelector('.popup__input_type_name');
const inputAbout = formEditProfile.querySelector('.popup__input_type_about');
const inputTitle = formAddCard.querySelector('.popup__input_type_title');
const inputUrl = formAddCard.querySelector('.popup__input_type_url');
//кнопки на странице
const buttonEditProfile = document.querySelector('.button_type_edit');
const buttonAddCard = document.querySelector('.button_type_add');
//информация профиля на странице
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
//массив кнопок "закрыть"
const closeButtons = Array.from(document.querySelectorAll('.button_type_close'));

//отрисовка стартовых карточек на странице
initialCards.forEach((item) => {
  addCard(item);
});

//включение валидации форм
const formEditProfileValidator = new FormValidator(validationConfig, formEditProfile);
formEditProfileValidator.enableValidation();
const formAddCardValidator = new FormValidator(validationConfig, formAddCard);
formAddCardValidator.enableValidation();

//функция открытия поп-апа
function openPopup(popupElement) {
  document.addEventListener('keydown', closePopupPressEsc);
  popupElement.classList.add('popup_opened');
};

//функция закрытия поп-апа
function closePopup(popupElement) {
  document.removeEventListener('keydown', closePopupPressEsc);
  popupElement.classList.remove('popup_opened');
};

//функция добавления карточки на страницу
function addCard(object) {
  const card = new Card(object, '.template', handleOpenPopupImage);
  const cardElement = card.generateCard();
  elementsSection.prepend(cardElement);
};

//функция закрытия поп-апа по клику на overlay
function closePopupClickOnOverlay(evt, popupElement) {
  if (evt.target === evt.currentTarget) {
    closePopup(popupElement);
  };
};

//функция закрытия поп-апа нажатием на кнопку ESC
function closePopupPressEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  };
};

//функция обработчик события нажатия кнопки Закрыть
function handleButtonCloseClick(evt) {
  const popupElement = evt.target.closest('.popup');
  closePopup(popupElement);
};

//для каждой кнопки Закрыть добавим слушатель события 'клик'
closeButtons.forEach(function (buttonClose) {
  buttonClose.addEventListener('click', handleButtonCloseClick);
});

//функция заполнения значений полей ввода из разметки страницы (форма редактировать профиль)
function fillProfilePopupInputs() {
  inputName.value = profileTitle.textContent;
  inputAbout.value = profileSubtitle.textContent;
};

//функция открытия формы Редактировать профиль
function openFormEditProfile() {
  fillProfilePopupInputs();
  formEditProfileValidator.resetFormElementValidationState();
  openPopup(popupEditProfile);
};

//функция нажатия на кнопку Сохранить
function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputAbout.value;
  closePopup(popupEditProfile);
};

//функция открытия формы Добавить карточку
function openFormAddCard() {
  formAddCard.reset();
  formAddCardValidator.resetFormElementValidationState();
  openPopup(popupAddCard);
};

//функция нажатия на кнопку Создать
function addCardElement(evt) {
  evt.preventDefault();
  const cardObject = {
    name: inputTitle.value,
    url: inputUrl.value,
  };
  addCard(cardObject);
  closePopup(popupAddCard);
  formAddCard.reset();
};

//открытие модального окна с картинкой
function handleOpenPopupImage(caption, link) {
  const popupImage = document.querySelector('.popup_type_image');
  const popupImageElement = popupImage.querySelector('.popup__image');
  const popupFigcaptionElement = popupImage.querySelector('.popup__figcaption');
  popupImageElement.src = link;
  popupImageElement.alt = caption;
  popupFigcaptionElement.textContent = caption;
  openPopup(popupImage);
  };

//слушатели событий
buttonEditProfile.addEventListener('click', openFormEditProfile);
buttonAddCard.addEventListener('click', openFormAddCard);
formEditProfile.addEventListener('submit', submitEditProfileForm);
formAddCard.addEventListener('submit', addCardElement);
popupEditProfile.addEventListener('click', (evt) => {closePopupClickOnOverlay(evt, popupEditProfile)});
popupAddCard.addEventListener('click', (evt) => {closePopupClickOnOverlay(evt, popupAddCard)});
popupImage.addEventListener('click', (evt) => {closePopupClickOnOverlay(evt, popupImage)});
