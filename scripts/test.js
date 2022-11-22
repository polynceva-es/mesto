
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
