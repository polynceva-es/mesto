const buttonEdit = document.querySelector(".profile__button-edit");
const buttonClose = document.querySelector(".popup__button-close");
const popup = document.querySelector(".popup");
const formElement = popup.querySelector(".popup__form"); //Нашли форму
const inputName = popup.querySelector(".popup__text_type_name"); //Нашли поле ввода Имя
const inputAbout = popup.querySelector(".popup__text_type_about"); //Нашли поле ввода О себе
const profileTitle = document.querySelector(".profile__title"); //Нашли Имя на странице
const profileSubtitle = document.querySelector(".profile__subtitle"); //Нашли О себе на странице

//функция открытия поп-апа и присвоения значений полям ввода из разметки страницы
function openPopup() {
  popup.classList.add("popup_opened");
  inputName.value = profileTitle.textContent;
  inputAbout.value = profileSubtitle.textContent;
}

//функция закрытия поп-апа
function closePopup() {
  popup.classList.remove("popup_opened");
}

//функция нажатия на кнопку Сохранить и изменения информации на странице
function submitForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputName.value; //Запись значения поля Имя в текстовое содержимое на странице Имя
  profileSubtitle.textContent = inputAbout.value; //Запись значения поля О себе в текстовое содержимое на странице О себе
  closePopup();
}

buttonEdit.addEventListener("click", openPopup); //отслеживание события Клик по кнопке "Редактировать профиль"
buttonClose.addEventListener("click", closePopup); //отслеживание события Клик по кнопке "Закрыть поп-ап"
formElement.addEventListener("submit", submitForm); //отслеживание события “submit” - «отправка» у формы
