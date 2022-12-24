import { Card } from './Card.js';
import { initialCards } from "./InitialCards.js";
import { FormValidator } from './FormValidator.js';
import {validationConfig} from './ValidationConfig.js';

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
//массивы инпутов для каждой формы
const inputListformEditProfile = Array.from(formEditProfile.querySelectorAll('.popup__input'));
const inputListformAddCard = Array.from(formAddCard.querySelectorAll('.popup__input'));
//кнопки сабмита
const buttonSubmitFormEditProfile = formEditProfile.querySelector('.button_type_submit');
const buttonSubmitFormAddCard = formAddCard.querySelector('.button_type_submit');

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
  const card = new Card(object, '.template', openPopup);
  const cardElement = card.generateCard();
  document.querySelector('.elements').prepend(cardElement);
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
function inputInfo() {
  inputName.value = profileTitle.textContent;
  inputAbout.value = profileSubtitle.textContent;
};

//функция открытия формы Редактировать профиль
function openFormEditProfile() {
  inputInfo();
  formEditProfileValidator.resetFormElementValidationState(inputListformEditProfile, buttonSubmitFormEditProfile);//
  openPopup(popupEditProfile);
};

//функция нажатия на кнопку Сохранить
function submitEditProfileForm(evt) {
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputAbout.value;
  closePopup(popupEditProfile);
};

//функция открытия формы Добавить карточку
function openFormAddCard() {
  formAddCard.reset();
  formAddCardValidator.resetFormElementValidationState(inputListformAddCard, buttonSubmitFormAddCard);//
  openPopup(popupAddCard);
};

//функция нажатия на кнопку Создать
function addCardElement(evt) {
  const object = {
    name: inputTitle.value,
    url: inputUrl.value,
  };
  addCard(object);
  closePopup(popupAddCard);
  formAddCard.reset();
};
//слушатели событий
buttonEditProfile.addEventListener('click', openFormEditProfile);
buttonAddCard.addEventListener('click', openFormAddCard);
formEditProfile.addEventListener('submit', submitEditProfileForm);
formAddCard.addEventListener('submit', addCardElement);
popupEditProfile.addEventListener('click', (evt) => {closePopupClickOnOverlay(evt, popupEditProfile)});
popupAddCard.addEventListener('click', (evt) => {closePopupClickOnOverlay(evt, popupAddCard)});
popupImage.addEventListener('click', (evt) => {closePopupClickOnOverlay(evt, popupImage)});
