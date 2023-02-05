export class UserInfo {
  constructor(userNameSelector, userInfoSelector, userAvatarSelector) {
    this._profileTitle = document.querySelector(userNameSelector);
    this._profileSubtitle = document.querySelector(userInfoSelector);
    this._userAvatar = document.querySelector(userAvatarSelector)
7 };

  getUserInfo() {
    const userData = {
      name: this._profileTitle.textContent,
      about: this._profileSubtitle.textContent,
      avatar: this._userAvatar
    };
    return userData;
  };

  //метод принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(result) {
    this._profileTitle.textContent = result.name;
    this._profileSubtitle.textContent = result.about;
  };

  setUserAvatar(result) {
    this._userAvatar.src = result.avatar;
  }
}
