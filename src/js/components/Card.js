export default class Card {
  constructor() {
  }
  createBaseCard() {
    const container = document.createElement('div');
    const item = document.createElement('div');
    const itemHeader = document.createElement('div');
    const figure = document.createElement('div');
    const firstHeaderSpan = document.createElement('span');
    const secondHeaderSpan = document.createElement('span');

    const itemFooter = document.createElement('div');
    const link = document.createElement('a');
    const firstFooterSpan = document.createElement('span');
    const secondFooterSpan = document.createElement('span');
    const block = document.createElement('div');
    const title = document.createElement('h3');
    const text = document.createElement('p');

    item.classList.add('result__item');
    itemHeader.classList.add('result__item-header');
    firstHeaderSpan.classList.add('result__key');
    figure.classList.add('result__figure-container');
    secondHeaderSpan.classList.add('result__hint');

    link.classList.add('link');
    itemFooter.classList.add('result__item-footer');
    firstFooterSpan.classList.add('result__date');
    secondFooterSpan.classList.add('result__source');
    block.classList.add('result__block');
    title.classList.add('result__item-title');
    text.classList.add('result__text');

    link.setAttribute('target', '_blank');

    container.append(item);
    item.append(itemHeader);
    itemHeader.append(firstHeaderSpan);
    itemHeader.append(figure);
    itemHeader.append(secondHeaderSpan);

    item.append(link);
    link.append(itemFooter);
    itemFooter.append(firstFooterSpan);
    itemFooter.append(block);
    block.append(title);
    block.append(text);
    itemFooter.append(secondFooterSpan);

    return container;
  }
}