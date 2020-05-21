import OfficeCard from './OfficeCard';
export default class OfficeCardList extends OfficeCard {
  constructor(container) {
    super();
    this.container = container;
  }
  addOfficeCard(article) {
    const newCard = this.create(article);
    this.container.append(newCard);
  }
}