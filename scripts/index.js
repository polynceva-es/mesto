const buttonEditProfile = document.querySelector('.button_type_edit');
const buttonAddCard = document.querySelector('.button_type_add');
const conteinerFormEditProfile = document.querySelector('.popup__conteiner_form_edit');
const popupFormEditProfile = conteinerFormEditProfile.closest('.popup');
const conteinerFormAddCard = document.querySelector('.popup__conteiner_form_add');
const popupFormAddCard = conteinerFormAddCard.closest('.popup');
const conteinerPopupImage = document.querySelector('.popup__conteiner_image');
const popupFormImage = conteinerPopupImage.closest('.popup');
const formEditProfile =conteinerFormEditProfile.querySelector('.popup__form_edit');
const formAddCard = conteinerFormAddCard.querySelector('.popup__form_add');
const inputName = conteinerFormEditProfile.querySelector('.popup__text_type_name');
const inputAbout = conteinerFormEditProfile.querySelector('.popup__text_type_about');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const closeButtons = document.querySelectorAll('.button_type_close');
const templateElement = document.querySelector('.template').content;
const elementsSection = document.querySelector('.elements');
const popupImage = conteinerPopupImage.querySelector('.popup__image');
const popupFigcaption = conteinerPopupImage.querySelector('.popup__figcaption');
const inputTitle = conteinerFormAddCard.querySelector('.popup__text_type_title');
const inputUrl = conteinerFormAddCard.querySelector('.popup__text_type_url');

//функция нажатия на кнопку Like
function addLike(evt) {
  evt.target.classList.toggle('button_active');
}

//функция нажатия на кнопку Удалить
function deleteCard(evt) {
  evt.target.closest('.card').remove();
}

//функция открытия попапа с картинкой
function openPopupWithImage(evt) {
  const url = evt.target.src;
  const name = evt.target.alt;
  popupImage.src = url;
  popupImage.alt = name;
  popupFigcaption.textContent = name;
  openPopup(popupFormImage);
}

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
}

//функция добавления карточки на страницу
function addCard(card) {
  const cardElement = generateCard(card);
  elementsSection.prepend(cardElement);
}

//вызов функция отрисовки стартовых карточек на странице
initialCards.forEach(function(card) {
  addCard(card);
});

//функция открытия поп-апа
function openPopup(popupElement) {
popupElement.classList.add('popup_opened');
}

//функция закрытия поп-апа
function closePopup(popupElement) {
popupElement.classList.remove('popup_opened');
}

//функция заполнения значений полей ввода из разметки страницы (форма редактировать профиль)
function inputInfo() {
  inputName.value = profileTitle.textContent;
  inputAbout.value = profileSubtitle.textContent;
}

//функция обработчик события нажатия кнопки Закрыть
function handleButtonСloseClick(evt) {
  const popupElement = evt.target.closest('.popup');
  closePopup(popupElement);
}

//для каждой кнопки Закрыть добавим слушатель события 'клик'
closeButtons.forEach(function (buttonClose) {
  buttonClose.addEventListener('click', handleButtonСloseClick);
});

//функция открытия формы Редактировать профиль
function openFormEditProfile() {
  inputInfo();
  openPopup(popupFormEditProfile);
}

//функция нажатия на кнопку Сохранить
function handleProfile(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputAbout.value;
  closePopup(popupFormEditProfile);
}

//функция открытия формы Добавить карточку
function openFormAddCard() {
  openPopup(popupFormAddCard);
}

//функция нажатия на кнопку Создать
function addCardElement(evt) {
  evt.preventDefault();
  const card = {
    name: inputTitle.value,
    url: inputUrl.value
  }
  addCard(card);
  closePopup(popupFormAddCard);
  inputTitle.value = '';
  inputUrl.value = '';
}

buttonEditProfile.addEventListener('click', openFormEditProfile);
buttonAddCard.addEventListener('click', openFormAddCard);
formEditProfile.addEventListener('submit', handleProfile);
formAddCard.addEventListener('submit', addCardElement);

