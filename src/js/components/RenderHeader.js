import BaseComponent from './BaseComponent';
import toggleItemButton from '../utils/toggle-item-button';
import entranceHeader from '../utils/entrance-header';
export default class RenderHeader extends BaseComponent {
  constructor(button) {
    super();
    this.button = button;
    this._setHandlers([
      {
        element: this.button,
        event: 'click',
        callback: this._lockout,
      },
    ]);
  }
  renderUserName(callback) {
    const userName = document.querySelector('#userName');
    callback
    .then((res) => {
      userName.textContent = res.data.name;
    })
    .catch(() => { 
      userName.textContent = 'Noname';
    });
  }
  _lockout(event) {
    if (event.target === document.querySelector('#outputButton') || 
        event.target === document.querySelector('#homeImage') || 
        event.target.classList.contains('text_color_white')) {
      localStorage.removeItem('token');
      entranceHeader();
      toggleItemButton();
    }
    if (event.target === document.querySelector('#officeOutputButton') || 
        event.target === document.querySelector('#officeImage') || 
        event.target.classList.contains('text_color_black')) {
      localStorage.removeItem('token');
      window.location.href = '../index.html';
    }
  }
}