import Card from './Card';
export default class HomeCard extends Card{
  constructor() {
    super();
    this.article = [];
    document.querySelector('.result__news-container').addEventListener('click', this.funcCard);
  }
  create(key, article) {
    const { 
      url,
      urlToImage,
      publishedAt,
      title,
      description,
      source } = article;
    const container = document.querySelector('.result__news-container');
    const newCard = this.createBaseCard();
    const card = newCard.querySelector('.result__item');
    const link = card.querySelector('.link');
    card.querySelector('.result__hint').textContent = 'Войдите, чтобы сохранить статьи';
    const figure = card.querySelector('.result__figure-container');
    const figureItem = document.createElement('button');
    figureItem.classList.add('result__item-save');
    figureItem.classList.add('result__item-save_theme_inaktive');
    figure.append(figureItem);
    container.append(card);
    
    link.href = url;
    card.querySelector('.result__key').textContent = key;
    card.querySelector('.result__item-header').style.backgroundImage = `url(${urlToImage})`;
    card.querySelector('.result__date').textContent = publishedAt.slice(0, 10);
    card.querySelector('.result__item-title').textContent = title;
    card.querySelector('.result__text').textContent = description;
    card.querySelector('.result__source').textContent = source.name;
    if (!localStorage.getItem('token')) {
      card.querySelector('.result__hint').classList.add('is-opened');
    }
  }
  funcCard(event) {
    if(event.target.closest('.result__item-save')) {
      if(localStorage.getItem('token')) {
        event.target.classList.toggle('result__item-save_theme_inaktive');
        event.target.classList.toggle('result__item-save_theme_aktive');
      }
    }
  }
}
