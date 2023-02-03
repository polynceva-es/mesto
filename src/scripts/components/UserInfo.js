import { api } from '../components/Api.js'
export class UserInfo {
  constructor(userNameSelector, userInfoSelector, userAvatarSelector) {
    this._profileTitle = document.querySelector(userNameSelector);
    this._profileSubtitle = document.querySelector(userInfoSelector);
    this._userAvatar = document.querySelector(userAvatarSelector)
7 };

  getUserInfo() {
    const userData = {
      name: this._profileTitle.textContent,
      about: this._profileSubtitle.textContent
    };
    return userData;
  };

  //метод принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(inputValues) {
    this._profileTitle.textContent = inputValues.name;
    this._profileSubtitle.textContent = inputValues.about;
  };

  //заполнение профиля информацией с сервера
  setUserInfoFromServer(){
     api.getUserInfoFromServer((result) => {
      this._profileTitle.textContent = result.name;
      this._profileSubtitle.textContent = result.about;
      this._userAvatar.src = result.avatar;
    });
  };
//?? отправка данных пользователя на сервер

}
