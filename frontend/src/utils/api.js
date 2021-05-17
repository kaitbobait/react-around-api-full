/**
 * works with the API
 * All requests are methods of this Class
 */
class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._authorize = headers.authorization;
    this._contentType = headers["Content-Type"];
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      // if server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
    }
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: {
        authorization: this._authorize,
      },
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  // GETs information for the user profile
  // getUserInfo() {
  //   return fetch(`${this._baseUrl}/users/me`, {
  //     method: "GET",
  //     headers: {
  //       authorization: this._authorize,
  //     },
  //   }).then((res) => {
  //     return this._checkResponse(res);
  //   });
  // }

  // modified the profile text content
  editProfile(values) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._authorize,
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        name: values.name,
        about: values.about,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  editAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._authorize,
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this._authorize,
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    let callMethod;
    if (!isLiked) {
      callMethod = "PUT";
    } else {
      callMethod = "DELETE";
    }

    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: callMethod,
      headers: {
        authorization: this._authorize,
      },
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  deleteCard(cardId) {
    console.log(arguments);
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._authorize,
        "Content-Type": this._contentType,
      },
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
}

const token = localStorage.getItem("token");

//URGENT change base url back to https://api.kaitbobait.students.nomoreparties.site
//local "http://localhost:3000/",
const api = new Api({
  baseUrl: "http://localhost:3000/",
  headers: {
    //TODO change hard coded token
    //authorization: `Bearer ${localStorage.getItem("token")}`,
    authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

export default api;
