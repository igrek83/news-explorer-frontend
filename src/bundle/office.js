import "../pages/office-page/office.css";

class Popup {
  constructor(button, closeButton) {
    this.button = button;
    this.closeButton = closeButton;
    this.button.addEventListener('click', this.open);
    this.closeButton.addEventListener('click', this.close);
  }
  open(event) {
    switch(event.target) {
      case document.querySelector('#authButton'):
        document.querySelector('.popup').classList.add('is-opened');
        document.querySelector('#autharizationPopup').classList.remove('is-opened');
        document.querySelector('#authPopup').classList.add('is-opened');
        return;
      case document.querySelector('#secondAuthButton'):
        document.querySelector('.popup').classList.add('is-opened'); 
        document.querySelector('#autharizationPopup').classList.remove('is-opened');
        document.querySelector('#authPopup').classList.add('is-opened');
        return;
      case document.querySelector('#autharizationButton'):
        document.querySelector('.popup').classList.add('is-opened');
        document.querySelector('#authPopup').classList.remove('is-opened');
        document.querySelector('#autharizationPopup').classList.add('is-opened');
        return;
      case document.querySelector('.header__menu'):
        document.querySelector('.header__container').classList.add('is-opened');
        document.querySelector('.header__menu').classList.add('is-closed');
        document.querySelector('.header__close-menu').classList.add('is-opened');
        return;
    }
  }
  close(event) {
    switch(event.target) {
      case document.querySelector('#authClose'):
        document.querySelector('.popup').classList.remove('is-opened');
        document.querySelector('#authPopup').classList.remove('is-opened');
        return;
      case document.querySelector('#autharizationClose'):
        document.querySelector('.popup').classList.remove('is-opened');
        document.querySelector('#autharizationPopup').classList.remove('is-opened');
        return;
      case document.querySelector('.header__close-menu'):
        document.querySelector('.header__container').classList.remove('is-opened');
        document.querySelector('.header__menu').classList.remove('is-closed');
        document.querySelector('.header__close-menu').classList.remove('is-opened');
        return;  
    }
  }
}
const menu = new Popup(document.querySelector('.header__menu'), document.querySelector('.header__close-menu'));