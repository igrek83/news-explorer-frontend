export default class MainApi {
  constructor(url) {
    this.url = url;
  }

  static getJSONResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  }

  signup(email, password, name) {
    return fetch(this.url+'/signup', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    })
    .then((res) => MainApi.getJSONResponse(res));
  }

  signin(email, password) {
    return fetch(this.url+'/signin', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
    .then((res) => MainApi.getJSONResponse(res));
  }

  getUserData() {
    return fetch(this.url+'/users/me', {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(res => MainApi.getJSONResponse(res));
  }

  addingArticle(article) {
    return fetch(this.url+'/articles', {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      method: 'POST',
      body: JSON.stringify({
        keyword: article.keyword,
        title: article.title,
        text: article.text,
        date: article.date,
        source: article.source,
        link: article.link,
        image: article.image,
      }),
    }).then(res => MainApi.getJSONResponse(res));
  }

  deleteArticle(articleId) {
    return fetch(this.url+'/articles/'+articleId, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      method: 'DELETE',
    }).then(res => MainApi.getJSONResponse(res));
  }

  getArticles() {
    return fetch(this.url+'/articles', {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(res => MainApi.getJSONResponse(res));
  }
}