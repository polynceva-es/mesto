const buttonEdit = document.querySelector('.button-edit');
const buttonClose = document.querySelector('.button-close');
const popup = document.querySelector('.popup');
let formSubmitElement = popup.querySelector('.popup__container'); //Нашли форму
let inputName = popup.querySelector('.popup__text_type_name'); //Нашли поле ввода Имя
let inputAbout = popup.querySelector('.popup__text_type_about'); //Нашли поле ввода О себе
let profileTitle = document.querySelector('.profile__title'); //Нашли Имя на странице
let profileSubtitle= document.querySelector('.profile__subtitle'); //Нашли О себе на странице


//функция открытия поп-апа и присвоения значений полям ввода из разметки страницы
function popupOpen() {
  popup.classList.add('popup_opened');
  inputName.value = profileTitle.textContent;
  inputAbout.value = profileSubtitle.textContent;
}
buttonEdit.addEventListener('click', popupOpen); //отслеживание события Клик по кнопке "Редактировать профиль"


//функция закрытия поп-апа
function popupClose() {
  popup.classList.remove('popup_opened');
}
buttonClose.addEventListener('click', popupClose); //отслеживание события Клик по кнопке "Закрыть поп-ап"


//функция нажатия на кнопку Сохранить и изменения информации на странице
function formSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = inputName.value; //Запись значения поля Имя в текстовое содержимое на странице Имя
  profileSubtitle.textContent = inputAbout.value; //Запись значения поля О себе в текстовое содержимое на странице О себе
  popupClose();
}

// Прикрепляем обработчик к форме: он следит за событием “submit” - «отправка»
formSubmitElement.addEventListener('submit', formSubmit);
