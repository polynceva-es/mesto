const initialCards = [
  {
    name: 'Сахалин',
    url: 'https://images.unsplash.com/photo-1662953748980-f8adec7fdf6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTAxfHwlRDElODAlRDAlQkUlRDElODElRDElODElRDAlQjglRDElOEZ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Республика Алтай',
    url: 'https://images.unsplash.com/photo-1605354180969-0f3fc29665bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTIwfHwlRDElODAlRDAlQkUlRDElODElRDElODElRDAlQjglRDElOEZ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Красноярский край',
    url: 'https://images.unsplash.com/photo-1597125760773-b0166e249ea7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTF8fHJ1c3NpYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Республика Дагестан',
    url: 'https://images.unsplash.com/photo-1580405658898-847dafe134e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTg2fHwlRDElODAlRDAlQkUlRDElODElRDElODElRDAlQjglRDElOEZ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Иркутская область',
    url: 'https://images.unsplash.com/photo-1575297209502-8458cef48bf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTk4fHwlRDElODAlRDAlQkUlRDElODElRDElODElRDAlQjglRDElOEZ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Вологодская область',
    url: 'https://images.unsplash.com/photo-1623828168222-288542b2c276?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTQ3fHwlRDElODAlRDAlQkUlRDElODElRDElODElRDAlQjglRDElOEZ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
  }
];
const buttonClose = document.querySelector('.button_type_close');
const popup = document.querySelector('.popup');
const buttonEdit = document.querySelector('.button_type_edit');
const buttonAdd = document.querySelector('.button_type_add');
const formEditElement = popup.querySelector('.popup__form_edit');
const formAddElement = popup.querySelector('.popup__form_add');


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

//функция закрытия поп-апа
function closePopup() {
  const popupForms = document.querySelectorAll('.popup__form');
  for (i=0; i<popupForms.length; i+=1) {
    popupForms[i].classList.remove('popup__form_opened');
  }
  popup.classList.add('popup_close');
  popup.classList.remove('popup_opened');
}

//функция открытия поп-апа
function openPopup() {
  popup.classList.add('popup_opened');
  popup.classList.remove('popup_close');
}

//функция заполнения значений полей ввода из разметки страницы (форма редактировать профиль)
function inputInfo() {
  const inputName = popup.querySelector('.popup__text_type_name'); //Нашли поле ввода Имя
  const inputAbout = popup.querySelector('.popup__text_type_about'); //Нашли поле ввода О себе
  const profileTitle = document.querySelector('.profile__title'); //Нашли Имя на странице
  const profileSubtitle = document.querySelector('.profile__subtitle'); //Нашли О себе на странице
  inputName.value = profileTitle.textContent;
  inputAbout.value = profileSubtitle.textContent;
}

//функция открытия формы Редактировать профиль
function openFormEdit(){
  openPopup();
  inputInfo();
  const formEditElement = popup.querySelector('.popup__form_edit');
  formEditElement.classList.add('popup__form_opened');
}

//функция нажатия на кнопку Сохранить
function editProfile(evt) {
  evt.preventDefault();
  const inputName = popup.querySelector('.popup__text_type_name'); //Нашли поле ввода Имя
  const inputAbout = popup.querySelector('.popup__text_type_about'); //Нашли поле ввода О себе
  const profileTitle = document.querySelector('.profile__title'); //Нашли Имя на странице
  const profileSubtitle = document.querySelector('.profile__subtitle'); //Нашли О себе на странице
  profileTitle.textContent = inputName.value; //Запись значения поля Имя в текстовое содержимое на странице Имя
  profileSubtitle.textContent = inputAbout.value; //Запись значения поля О себе в текстовое содержимое на странице О себе
  closePopup();
}

//функция открытия формы Добавления карточки
function openFormAdd(){
  openPopup();
  const formAddElement = popup.querySelector('.popup__form_add');
  formAddElement.classList.add('popup__form_opened');
}

//функция нажатия на кнопку Создать
function addCardElement(evt) {
  evt.preventDefault();
  const inputTitle = popup.querySelector('.popup__text_type_title');
  const inputUrl = popup.querySelector('.popup__text_type_url');
  let name = inputTitle.value;
  let url = inputUrl.value;
  addCard(name, url);
  closePopup();
  inputTitle.value = '';
  inputUrl.value = '';
}

//функция добавления карточки на страницу
function addCard(name, url) {
  const elements = document.querySelector('.elements'); //Нашли секцию Elements
  const cardElemet = document.createElement('article'); //Создали тег article
  cardElemet.classList.add('card'); //Присвоили класс card
  elements.prepend(cardElemet); //Добавили карточку в начало секции Elements
  const cardImage = document.createElement('img'); //Создали тег img
  cardImage.classList.add('card__image'); //Присвоили класс
  cardImage.setAttribute('src', url); //Задали атрибут
  cardImage.setAttribute('alt', name); //Задали атрибут
  const buttonDelete = document.createElement('button'); //Создали тег button
  buttonDelete.classList.add('button', 'button_type_delete'); //Присвоили класс
  buttonDelete.setAttribute('type', 'button'); //Задали атрибут
  buttonDelete.setAttribute('aria-label', 'Удалить карточку'); //Задали атрибут
  const cardItem = document.createElement('div'); //Создали тег div
  cardItem.classList.add('card__item'); //Присвоили класс
  cardElemet.prepend(cardImage, buttonDelete, cardItem); //Добавили в начало тега article элементы img, button, div
  const cardCaption = document.createElement('h2');
  cardCaption.classList.add('card__caption');
  cardCaption.textContent = name;
  const buttonLike = document.createElement('button');
  buttonLike.classList.add('button', 'button_type_like');
  buttonLike.setAttribute('type', 'button');
  buttonLike.setAttribute('aria-label', 'Поставить лайк');
  cardItem.prepend(cardCaption, buttonLike);
  buttonDelete.addEventListener('click', deleteCard);
  buttonLike.addEventListener('click', addLike);
}

//вызов функция отрисовки стартовых карточек на странице
// for (i=0; i<initialCards.length; i+=1) {
//   addCard(initialCards[i].name, initialCards[i].url);}
for (i=initialCards.length-1; i>=0; i-=1) {
  addCard(initialCards[i].name, initialCards[i].url);
}

buttonClose.addEventListener('click', closePopup);
buttonEdit.addEventListener('click', openFormEdit);
buttonAdd.addEventListener('click', openFormAdd);
formEditElement.addEventListener('submit', editProfile);
formAddElement.addEventListener('submit', addCardElement);
