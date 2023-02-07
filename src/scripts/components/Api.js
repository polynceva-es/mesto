class Api {
  constructor(options) {
    this.url = options.baseUrl;
    this.headers = options.headers;
  }

  getInitialCards(){
    return fetch(`${this.url}cards`, {headers: this.headers})
      .then(res => {if(res.ok){return res.json()} else{return Promise.reject(`Ошибка: ${res.status}`)}})
      .catch(err => {console.log('Ошибка:' + err)})
  }

  getUserInfo(){
    return fetch(`${this.url}users/me`, {headers: this.headers})
      .then(res => {if(res.ok) {return res.json()} else{return Promise.reject(`Ошибка: ${res.status}`)}})
      .catch(err => {console.log('Ошибка:' + err)})
  }

  setUserInfo(formValues) {
    return fetch(`${this.url}users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({name: formValues.name, about: formValues.about})
    })
      .then(res => {if(res.ok) {return res.json()} else{return Promise.reject(`Ошибка: ${res.status}`)}})
      .catch(err => {console.log('Ошибка:' + err)})
  }

  setUserAvatar(formValue) {
    return fetch(`${this.url}users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({avatar: formValue.avatar})
    })
      .then(res => {if(res.ok) {return res.json()} else{return Promise.reject(`Ошибка: ${res.status}`)}})
      .catch(err => {console.log('Ошибка:' + err)})
  }

  setNewCard(formValues) {
    return fetch(`${this.url}cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({name: formValues.title, link: formValues.url})
    })
      .then(res => {if(res.ok) {return res.json()} else{return Promise.reject(r`Ошибка: ${res.status}`)}})
      .catch(err => {console.log('Ошибка:' + err)})
  }

    setDeleteCard(cardID) {
      return fetch(`${this.url}cards/${cardID}`, {
        method: 'DELETE',
        headers: this.headers
      })
      .then(res => {if(res.ok) {return res.json()} else{return Promise.reject(`Ошибка: ${res.status}`)}})
      .catch(err => {console.log('Ошибка:' + err)})
    }

  setLikeCard(cardID) {
      return fetch(`${this.url}cards/${cardID}/likes`, {
        method: 'PUT',
        headers: this.headers
      })
      .then(res => {if(res.ok) {return res.json()} else{return Promise.reject(`Ошибка: ${res.status}`)}})
      .catch(err => {console.log('Ошибка:' + err)})
  }
  deleteLikeCard(cardID) {
    return fetch(`${this.url}cards/${cardID}/likes`, {
        method: 'DELETE',
        headers: this.headers
      })
      .then(res => {if(res.ok) {return res.json()} else{return Promise.reject(`Ошибка: ${res.status}`)}})
      .catch(err => {console.log('Ошибка:' + err)})
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59/',
  headers: {
    authorization: 'aa54815a-a694-4551-bee1-36c34eb26764',
    'Content-Type': 'application/json'
  }
});
