export default class Result {
  constructor() {
    this.counter = 0;
    this.key = "";
    this.array =[];
  }
  preloader() {
    document.querySelector('#preloader').classList.toggle('is-opened');
  }
  addNotFoundResult() {
    document.querySelector('#notFoundResult').classList.add('is-opened');
  }
  addCathResult() {
    document.querySelector('#cathResult').classList.add('is-opened');
  }
  delCathResult() {
    document.querySelector('#cathResult').classList.add('is-opened');
  }
  addButton() {
    document.querySelector('.result__button').classList.add('is-opened');
  }
  delButton() {
    document.querySelector('.result__button').classList.remove('is-opened');
  }
  addResult() {
    document.querySelector('.result').classList.add('is-opened');
  }
  delResult() {
    document.querySelector('.result').classList.remove('is-opened');
  }
  addNewsResult() {
    document.querySelector('.result__large-container').classList.add('is-opened');
  }
  delNewsResult() {
    document.querySelector('.result__large-container').classList.remove('is-opened');
  }
}