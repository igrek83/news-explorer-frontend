import searchDate from '../utils/search-date.js';
export default class NewsApi {
  constructor(url, pageSize, token) {
    this.url =url;
    this.pageSize = pageSize;
    this.token = token;
  }
  getJsonRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }
  getNews(key) {
    return fetch(this.url+`?q=${key}`+searchDate()+`&pageSize=${this.pageSize}`, {
      method: 'GET',
      headers: {
        authorization: this.token,
      },
    })
    .then((res) => this.getJsonRes(res));
  }
}