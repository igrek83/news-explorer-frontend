import BaseComponent from './BaseComponent';
export default class Menu extends BaseComponent {
  constructor(button, closeButton) {
    super();
    this.button = button;
    this.closeButton = closeButton;
    this._setHandlers([
      {
        element: this.button,
        event: 'click',
        callback: this._open,
      },
      {
        element: this.closeButton,
        event: 'click',
        callback: this._close,
      },
    ]);
  }
  _open() {
    document.querySelector('.header__container').classList.add('is-opened');
    document.querySelector('.header__menu').classList.add('is-closed');
    document.querySelector('.header__close-menu').classList.add('is-opened');
  }
  _close() {
    document.querySelector('.header__container').classList.remove('is-opened');
    document.querySelector('.header__menu').classList.remove('is-closed');
    document.querySelector('.header__close-menu').classList.remove('is-opened');
  }
}