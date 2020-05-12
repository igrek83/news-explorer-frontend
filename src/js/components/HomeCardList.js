import HomeCard from './HomeCard';
export default class HomeCardList extends HomeCard {
  constructor(container) {
    super();
    this.container = container;
  }
  addHomeCard(key, article) {
    const newCard = this.create(key, article);
    this.container.append(newCard);
  }
  deleteCards() {
    const arrayCard = document.querySelectorAll('.result__item');
    arrayCard.forEach(function(item) {
      item.parentNode.removeChild(item);
    });
  }
}