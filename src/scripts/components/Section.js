//вставка элементов в разметку
//items — это массив данных, которые нужно добавить на страницу при инициализации класса
//renderer — это функция, которая отвечает за создание и отрисовку данных на странице
//selector — селектор контейнера, в который нужно добавлять созданные элементы
//renderItems - метод, который отвечает за отрисовку всех элементов
//addItem - метод, который принимает DOM-элемент и добавляет его в контейнер

export class Section {
  constructor(renderer, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  };

  renderItems(initialArray) {
    initialArray.forEach((item) => {
      this._renderer(item);
    });
  };

  addItem(element) {
    this._container.append(element);
  };
}
