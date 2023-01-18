export class UserInfo {
  constructor(userNameSelector, userInfoSelector) {
    this._profileTitle = document.querySelector(userNameSelector);
    this._profileSubtitle = document.querySelector(userInfoSelector);
  };

  getUserInfo() {
    const userData = {name: this._profileTitle.textContent, about: this._profileSubtitle.textContent};
    return userData;
  };

  //метод принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(inputValues) {
    this._profileTitle.textContent = inputValues.name;
    this._profileSubtitle.textContent = inputValues.about;
  };
}
