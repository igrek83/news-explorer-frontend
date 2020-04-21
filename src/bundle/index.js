import "../index.css";

function z(event) {
  const x = event.target;
  if(x === document.querySelector('.result__item-save')) {
    x.classList.toggle('result__item-save_theme_inaktive');
    x.classList.toggle('result__item-save_theme_aktive');
  }
}
document.querySelector('.result__item-save').addEventListener('click', z);




const regNameInput = document.querySelector('#regNameInput');
const regPassInput = document.querySelector('#regPassInput');
const regEmailInput = document.querySelector('#regEmailInput');
const searchInput = document.querySelector('.search__input');

const autharizationEmailInput = document.querySelector('#autharizationEmailInput');
const autharizationPassInput = document.querySelector('#autharizationPassInput');

class Validate {
  constructor(input) {
    this.input = input;
    this.input.addEventListener('input', this.validate.bind(this));
  }
  validate(event) {
    let input = event.target;
    const firstFormButton = document.querySelector('#authSubmitButton');
    const secondFormButton = document.querySelector('#autharizationSubmitButton');
    const searchButton = document.querySelector('.search__button');
    if (!input.checkValidity()) {
      this.messageError();
      if (!autharizationEmailInput.checkValidity() || !autharizationPassInput.checkValidity()) {
        secondFormButton.setAttribute('disabled', 'true');
        secondFormButton.classList.remove('button_color_blue');
        secondFormButton.classList.add('button_color_gray');
      }
      if (!searchInput.checkValidity()) {
        searchButton.setAttribute('disabled', 'true');
        searchButton.classList.remove('button_color_blue');
        searchButton.classList.add('button_color_gray');
      }
      if (!regNameInput.checkValidity() || !regEmailInput.checkValidity() || !regPassInput.checkValidity()) {
        firstFormButton.setAttribute('disabled', 'true');
        firstFormButton.classList.remove('button_color_blue');
        firstFormButton.classList.add('button_color_gray');
      }
    }
     if (input.checkValidity()) {
      this.resetError();
      if (regNameInput.checkValidity() && regPassInput.checkValidity() && regEmailInput.checkValidity()) {
        firstFormButton.removeAttribute('disabled');
        firstFormButton.classList.remove('button_color_gray');
        firstFormButton.classList.add('button_color_blue');
      }
      if (autharizationPassInput.checkValidity() && autharizationEmailInput.checkValidity()) {
        secondFormButton.removeAttribute('disabled');
        secondFormButton.classList.remove('button_color_gray');
        secondFormButton.classList.add('button_color_blue');
      }
      if (searchInput.checkValidity()) {
        searchButton.removeAttribute('disabled');
        searchButton.classList.add('button_color_blue');
        searchButton.classList.remove('button_color_gray');
      }
    }
  }
  messageError() {
    let element = this.input;
    let error = element.nextElementSibling;
    error.classList.add('visibility');
    if(element.validity.tooShort === true) {
      if(element === regNameInput) {
        error.textContent = "Должно быть не меньше двух символов";
        return;
      }
      if(element === regPassInput || element === autharizationPassInput) {
        error.textContent = "Должно быть не меньше 8 символов";
        return;
      }
      return;
    }
    if(element.validity.valueMissing === true) {
      if(element === regNameInput) {
        error.textContent = "Введите Ваше имя";
        return;
      }
      if(element === regPassInput || element === autharizationPassInput) {
        error.textContent = "Введите Ваш пароль";
        return;
      }
      if(element === regEmailInput || element === autharizationEmailInput) {
        error.textContent = "Введите Ваш email";
        return;
      }
      return;
    }
    if(element.validity.typeMismatch) {
      error.textContent = "Неправильный формат email";
    }
  }
  resetError() {
    this.input.nextElementSibling.classList.remove('visibility');
    this.input.nextElementSibling.texcontent = "";
  }
}
const u = new Validate(regNameInput);
const o = new Validate(regPassInput);
const p = new Validate(regEmailInput);

const s = new Validate(autharizationEmailInput);
const q = new Validate(autharizationPassInput);

const b = new Validate(searchInput);





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
      case document.querySelector('.header__menu_theme_home'):
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
const firstPopup = new Popup(document.querySelector('#authButton'), document.querySelector('#authClose'));
const firstDoublePopup = new Popup(document.querySelector('#secondAuthButton'), document.querySelector('#authClose'));
const secondPopup = new Popup(document.querySelector('#autharizationButton'), document.querySelector('#autharizationClose'));
const menu = new Popup(document.querySelector('.header__menu'), document.querySelector('.header__close-menu'));

function ss() {
  document.querySelector('.popup').classList.add('is-opened');
  document.querySelector('#miniPopup').classList.add('is-opened');
}
function dd() {
  document.querySelector('.popup').classList.remove('is-opened');
  document.querySelector('#miniPopup').classList.remove('is-opened');
}
document.querySelector('.header__title').addEventListener('click', ss);
document.querySelector('#closeMiniPopup').addEventListener('click', dd);