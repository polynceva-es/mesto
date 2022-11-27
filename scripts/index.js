const initialCards = [
  {
    name: 'Кабардино-Балкарская Республика',
    url: 'https://images.unsplash.com/photo-1622381638713-64bc713d8f48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    name: 'Переславль-Залесский',
    url: 'https://images.unsplash.com/photo-1631083215590-63346fae79f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
  },
  {
    name: 'Республика Карелия',
    url: 'https://images.unsplash.com/photo-1632937024624-a0ab29126f8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80',
  },
  {
    name: 'Сихотэ-Алинь',
    url: 'https://images.unsplash.com/photo-1644543419167-2cc7a5738665?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80',
  },
  {
    name: 'Карачаево-Черкесская Республика',
    url: 'https://images.unsplash.com/photo-1627329904799-607897b1eb60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
  },
  {
    name: 'Московская Область',
    url: 'https://images.unsplash.com/photo-1609067936529-59bf24113fec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80',
  },
];
const buttonEditProfile = document.querySelector('.button_type_edit');
const buttonAddCard = document.querySelector('.button_type_add');
const conteinerFormEditProfile = document.querySelector('.popup__conteiner_form_edit');
const conteinerFormAddCard = document.querySelector('.popup__conteiner_form_add');
const conteinerPopupImage = document.querySelector('.popup__conteiner_image');
const formEditProfile =conteinerFormEditProfile.querySelector('.popup__form_edit');
const formAddCard = conteinerFormAddCard.querySelector('.popup__form_add');
const inputName = conteinerFormEditProfile.querySelector('.popup__text_type_name');
const inputAbout = conteinerFormEditProfile.querySelector('.popup__text_type_about');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const closeButtons = document.querySelectorAll('.button_type_close');
const templateElement = document.querySelector('.template').content;
const elementsSection = document.querySelector('.elements');

//функция нажатия на кнопку Like
function addLike(evt) {
  const buttonLike = evt.target;
  buttonLike.classList.toggle('button_active');
}

//функция нажатия на кнопку Удалить
function deleteCard(evt) {
  const buttonDelete = evt.target;
  const cardToDelete = buttonDelete.closest('.card');
  cardToDelete.remove();
}

//функция открытия попапа с картинкой
function openPopupWithImage(evt) {
  const url = evt.target.src;
  const name = evt.target.alt;
  const popupImage = conteinerPopupImage.querySelector('.popup__image');
  popupImage.src = url;
  popupImage.alt = name;
  const popupFigcaption = conteinerPopupImage.querySelector('.popup__figcaption');
  popupFigcaption.textContent = name;
  openPopup(conteinerPopupImage);
}

//функция генерации карточки
function generateCard(name, url) {
  const cardElement = templateElement.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardCaption = cardElement.querySelector('.card__caption');
  cardImage.src = url;
  cardImage.alt = name;
  cardCaption.textContent = name;
  const buttonLike = cardElement.querySelector('.button_type_like');
  const buttonDelete = cardElement.querySelector('.button_type_delete');
  buttonLike.addEventListener('click', addLike);
  buttonDelete.addEventListener('click', deleteCard);
  cardImage.addEventListener('click', openPopupWithImage);
  return cardElement;
}

//функция добавления карточки на страницу
function addCard(name, url) {
  const cardElement = generateCard(name, url);
  elementsSection.prepend(cardElement);
}

//вызов функция отрисовки стартовых карточек на странице
initialCards.forEach(function(card) {
  addCard(card.name, card.url);
});

//функция нахождения ближайшего родителя (поп-апа)
function findClosestPopup(popupElement) {
  return popupElement.closest('.popup');
}

//функция открытия поп-апа
function openPopup(popupElement) {
  const popupElementParent = findClosestPopup(popupElement);
  popupElementParent.classList.add('popup_opened');
}

//функция закрытия поп-апа
function closePopup(popupElement) {
  const popupElementParent = findClosestPopup(popupElement);
  popupElementParent.classList.remove('popup_opened');
}

//функция заполнения значений полей ввода из разметки страницы (форма редактировать профиль)
function inputInfo() {
  inputName.value = profileTitle.textContent;
  inputAbout.value = profileSubtitle.textContent;
}

//функция обработчик события нажатия кнопки Закрыть
function handleButtonСloseClick(evt) {
  const buttonClose = evt.target;
  closePopup(buttonClose);
}

//для каждой кнопки Закрыть добавим слушатель события 'клик'
closeButtons.forEach(function (buttonClose) {
  buttonClose.addEventListener('click', handleButtonСloseClick);
});

//функция открытия формы Редактировать профиль
function openFormEditProfile() {
  inputInfo();
  openPopup(conteinerFormEditProfile);
}

//функция нажатия на кнопку Сохранить
function editProfile(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputAbout.value;
  closePopup(conteinerFormEditProfile);
}

//функция открытия формы Добавить карточку
function openFormAddCard() {
  openPopup(conteinerFormAddCard);
}

//функция нажатия на кнопку Создать
function addCardElement(evt) {
  evt.preventDefault();
  const inputTitle = conteinerFormAddCard.querySelector('.popup__text_type_title');
  const inputUrl = conteinerFormAddCard.querySelector('.popup__text_type_url');
  const name = inputTitle.value;
  const url = inputUrl.value;
  addCard(name, url);
  closePopup(conteinerFormAddCard);
  inputTitle.value = '';
  inputUrl.value = '';
}

buttonEditProfile.addEventListener('click', openFormEditProfile);
buttonAddCard.addEventListener('click', openFormAddCard);
formEditProfile.addEventListener('submit', editProfile);
formAddCard.addEventListener('submit', addCardElement);
