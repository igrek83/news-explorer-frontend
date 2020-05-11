import Card from './Card.js';
export default class OfficeCard extends Card {
  constructor() {
    super();
    document.querySelector('.result__news-container').addEventListener('click', this.delete);
  }
  create(article) {
    const {
      _id, 
      keyword,
      title,
      text,
      date,
      source,
      link,
      image } = article;
    const container = document.querySelector('.result__news-container');
    const newCard = this.createBaseCard();
    const card = newCard.querySelector('.result__item');
    const links = card.querySelector('.link');
    card.setAttribute('data-id', _id);
    card.querySelector('.result__hint').textContent = 'Убрать из сохраненных';
    card.querySelector('.result__hint').classList.add('is-opened');
    const figure = newCard.querySelector('.result__figure-container');
    const figureItem = document.createElement('div');
    card.querySelector('.result__key').classList.add('is-opened');
    figureItem.classList.add('result__item-del');
    figure.append(figureItem);
    container.append(card);
    links.href = link;
    card.querySelector('.result__key').textContent = keyword;
    card.querySelector('.result__item-header').style.backgroundImage = `url(${image})`;
    card.querySelector('.result__date').textContent = date;
    card.querySelector('.result__item-title').textContent = title;
    card.querySelector('.result__text').textContent = text;
    card.querySelector('.result__source').textContent = source;
  }
  delete(event) {
    if (event.target.closest('.result__item-del')) {
    const del = event.target.closest('.result__item');
    del.parentNode.removeChild(del);
    }
  }
}