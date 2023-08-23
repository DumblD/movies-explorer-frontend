class MainApi {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _checkServerResponseState(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then((res) => this._checkServerResponseState(res));
  }

  getSavedMoviesCards() {
    return this._request(this._url + "/movies", {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    });
  }

  getUserInfo() {
    return this._request(this._url + "/users/me", {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    });
  }

  updateUserInfo(name, email) {
    return this._request(this._url + "/users/me", {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        email: email,
      })
    })
  }
}

export const mainApi = new MainApi({
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});
