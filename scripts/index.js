const popupEditProfile = document.querySelector('.popup_type_form-editprofile');
const popupAddCard = document.querySelector('.popup_type_form-addcard');
const popupImage = document.querySelector('.popup_type_image');
const formEditProfile = popupEditProfile.querySelector('.popup__form_edit');
const formAddCard = popupAddCard.querySelector('.popup__form_add');
const inputName = formEditProfile.querySelector('.popup__input_type_name');
const inputAbout = formEditProfile.querySelector('.popup__input_type_about');
const inputTitle = formAddCard.querySelector('.popup__input_type_title');
const inputUrl = formAddCard.querySelector('.popup__input_type_url');
const popupImageElement = popupImage.querySelector('.popup__image');
const popupFigcaptionElement = popupImage.querySelector('.popup__figcaption');
const buttonEditProfile = document.querySelector('.button_type_edit');
const buttonAddCard = document.querySelector('.button_type_add');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const closeButtons = Array.from(document.querySelectorAll('.button_type_close'));
const templateElement = document.querySelector('.template').content;
const elementsSection = document.querySelector('.elements');

//функция нажатия на кнопку Like
function addLike(evt) {
  evt.target.classList.toggle('button_active');
};

//функция нажатия на кнопку Удалить
function deleteCard(evt) {
  evt.target.closest('.card').remove();
};

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

//функция открытия попапа с картинкой
function openPopupWithImage(evt) {
  const url = evt.target.src;
  const name = evt.target.alt;
  popupImageElement.src = url;
  popupImageElement.alt = name;
  popupFigcaptionElement.textContent = name;
  openPopup(popupImage);
};

//функция генерации карточки
function generateCard(card) {
  const cardElement = templateElement.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardCaption = cardElement.querySelector('.card__caption');
  cardImage.src = card.url;
  cardImage.alt = card.name;
  cardCaption.textContent = card.name;
  const buttonLike = cardElement.querySelector('.button_type_like');
  const buttonDelete = cardElement.querySelector('.button_type_delete');
  buttonLike.addEventListener('click', addLike);
  buttonDelete.addEventListener('click', deleteCard);
  cardImage.addEventListener('click', openPopupWithImage);
  return cardElement;
};

//функция добавления карточки на страницу
function addCard(card) {
  const cardElement = generateCard(card);
  elementsSection.prepend(cardElement);
};

//вызов функция отрисовки стартовых карточек на странице
initialCards.forEach(function (card) {
  addCard(card);
});

//функция закрытия поп-апа по клику на overlay
function closePopupClickOnOverlay(evt) {
  const popupElement = evt.target.closest('.popup');
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
function handleButtonСloseClick(evt) {
  const popupElement = evt.target.closest('.popup');
  closePopup(popupElement);
};

//для каждой кнопки Закрыть добавим слушатель события 'клик'
closeButtons.forEach(function (buttonClose) {
  buttonClose.addEventListener('click', handleButtonСloseClick);
});

//функция валидации и открытия поп-апа
function validateAndOpenPopup(formPopup, popupElement) {
  const inputList = Array.from(formPopup.querySelectorAll('.popup__input'));
  inputList.forEach(function(inputElement) {
    hideInputError(formPopup, inputElement, {
      inputErrorClass: 'popup__input_type_error',
      errorClass: 'popup__error_true'});
  });
  const buttonElement = formPopup.querySelector('.button_type_submit');
  disabledButtonSubmit(inputList, buttonElement, {inactiveButtonClass: 'button_type_submit-error'});
  openPopup(popupElement);
};

//функция заполнения значений полей ввода из разметки страницы (форма редактировать профиль)
function inputInfo() {
  inputName.value = profileTitle.textContent;
  inputAbout.value = profileSubtitle.textContent;
};

//функция открытия формы Редактировать профиль
function openFormEditProfile() {
  inputInfo();
  validateAndOpenPopup(formEditProfile, popupEditProfile);
};

//функция нажатия на кнопку Сохранить
function handleProfile(evt) {
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputAbout.value;
  closePopup(popupEditProfile);
};

//функция открытия формы Добавить карточку
function openFormAddCard() {
  formAddCard.reset();
  validateAndOpenPopup(formAddCard, popupAddCard);
};

//функция нажатия на кнопку Создать
function addCardElement(evt) {
  const card = {
    name: inputTitle.value,
    url: inputUrl.value,
  };
  addCard(card);
  closePopup(popupAddCard);
  formAddCard.reset();
};

buttonEditProfile.addEventListener('click', openFormEditProfile);
buttonAddCard.addEventListener('click', openFormAddCard);
formEditProfile.addEventListener('submit', handleProfile);
formAddCard.addEventListener('submit', addCardElement);
popupEditProfile.addEventListener('click', closePopupClickOnOverlay);
popupAddCard.addEventListener('click', closePopupClickOnOverlay);
popupImage.addEventListener('click', closePopupClickOnOverlay);
