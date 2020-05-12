import BaseComponent from './BaseComponent';
import resetSubmitError from '../utils/reset-submit-error';
export default class Popup extends BaseComponent {
  constructor(button, container) {
    super();
    this.button = button;
    this.container = container;
    this.closing = this.closing.bind(this);
    this._setHandlers([
      {
        element: this.button,
        event: 'click',
        callback: this._open,
      },
      {
        element: this.container,
        event: 'click',
        callback: this._close,
      },
      {
        element: window,
        event: 'mousdown',
        callback: this._close,
      },
      {
        element: window,
        event: 'keydown',
        callback: this._close,
      },
    ]);
  }
  openMiniPopup() {
    document.querySelector('.popup').classList.add('is-opened');
    document.querySelector('#miniPopup').classList.add('is-opened');
  }
  closing() {
    document.querySelector('.popup').classList.remove('is-opened');
    document.querySelector('#authPopup').classList.remove('is-opened');
    document.querySelector('#autharizationPopup').classList.remove('is-opened');
    document.querySelector('#miniPopup').classList.remove('is-opened');
  }
  _open(event) {
    document.querySelector('.popup').classList.add('is-opened');
    switch(event.target) {
      case document.querySelector('#authButton'):
        document.querySelector('#autharizationPopup').classList.remove('is-opened');
        document.querySelector('#authPopup').classList.add('is-opened');
        return;
      case document.querySelector('#secondAuthButton'):
        document.querySelector('#autharizationPopup').classList.remove('is-opened');
        document.querySelector('#authPopup').classList.add('is-opened');
        return;
      case document.querySelector('#autharizationButton'):
        document.querySelector('#authPopup').classList.remove('is-opened');
        document.querySelector('#autharizationPopup').classList.add('is-opened');
        return;
      case document.querySelector('#secondAutharizationButton'):
        document.querySelector('#miniPopup').classList.remove('is-opened');
        document.querySelector('#autharizationPopup').classList.add('is-opened');
        return;
    }
  }
  _close(event) {
    if (event.target.classList.contains('popup__close') || event.target.classList.contains('popup') || event.keyCode === 27) {
      document.querySelector('.popup').classList.remove('is-opened');
      document.querySelector('#authPopup').classList.remove('is-opened');
      document.querySelector('#autharizationPopup').classList.remove('is-opened');
      document.querySelector('#miniPopup').classList.remove('is-opened');
      resetSubmitError();
    }
  }
}