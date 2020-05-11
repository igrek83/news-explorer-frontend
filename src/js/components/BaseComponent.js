export default class BaseComponent {
  constructor() {
    this.handlers = [];
  }
  _setHandlers(listener) {
    this._pushListener(listener);
    this._addEventListener();
  }
  _pushListener(listener) {
    listener.forEach(({ element, event, callback }) => {
      const bindCallback = callback.bind(this);
      this.handlers.push({ element, event, bindCallback });
    });
  }
  _addEventListener() {
    this.handlers.forEach(({element, event, bindCallback}) => {
      element.addEventListener(event, bindCallback);
    });
  }
  _removeEventListener() {
    this.handlers.forEach(({element, event, bindCallback}) => {
      element.removeEventListener(event, bindCallback);
    });
  }
}