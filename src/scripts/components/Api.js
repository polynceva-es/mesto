class Api {
  constructor(options) {
    this.url = options.baseUrl;
    this.headers = options.headers;
  }

  getInitialCards(rendererItems){
    fetch(`${this.url}cards`, {headers: this.headers})
      .then(res => {if(res.ok){return res.json()}})
      .then((data) => {rendererItems(data);})
      .catch(err => {console.log('Sorry,' + err)})
  }

  getUserInfoFromServer(setUserInfo){
    fetch(`${this.url}users/me`, {headers: this.headers})
      .then(res => {if(res.ok) {return res.json()}})
      .then(data => {setUserInfo(data)})
      .catch(err => {console.log('Sorry,' + err)})
  }

  setUserInfoToServer(formValues, setUserInfo) {

    fetch(`${this.url}users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({name: formValues.name, about: formValues.about})
    })
      .then(res => {if(res.ok) {return res.json()}})
      .then(data => {setUserInfo(data)})
      .catch(err => {console.log('Sorry,' + err)})
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59/',
  headers: {
    authorization: 'aa54815a-a694-4551-bee1-36c34eb26764',
    'Content-Type': 'application/json'
  }
});
