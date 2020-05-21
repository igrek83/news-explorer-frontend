import HomeCard from './HomeCard';
import Card from './Card';
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
    const arrayCards = document.querySelectorAll('.result__item');
    arrayCards.forEach(function(item) {
      item.parentNode.removeChild(item);
    });
  }
}