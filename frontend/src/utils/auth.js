class AuthApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._contentType = headers["Content-Type"];
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // if server returns an error, reject the promise
    return Promise.reject(`Error: ${res.statusText}: ${res.status}`);
  }

  register(email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": this._contentType
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        return this._checkResponse(res);
      })
      .then((res) => {
        return res;
      })
  }

  authorize(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        return this._checkResponse(res);
      })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          return res;
        } else {
          console.log("token is coming up undefined");
          return;
        }
      })
  }

  getContent(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": this._contentType,
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return this._checkResponse(res);
      })
      .then((data) => data);
  }
}

const auth = new AuthApi({
  //URGENT change base url back to https://api.kaitbobait.students.nomoreparties.site
  //local: http://localhost:3000/
  baseUrl: process.env.NODE_ENV === 'production' ? "https://api.kaitbobait.students.nomoreparties.site" : "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default auth;

