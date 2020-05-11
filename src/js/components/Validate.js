import ErrorValidate from './ErrorValidate';
import buttonInactive from '../utils/button-inactive';
import buttonActive from '../utils/button-active';
export default class Validate extends ErrorValidate {
  constructor(input) {
    super(input);
    this.input.addEventListener('input', this._validate.bind(this));
  }
  _validate(event) {
    let input = event.target;
    const firstFormButton = document.querySelector('#authSubmitButton');
    const secondFormButton = document.querySelector('#autharizationSubmitButton');
    const searchButton = document.querySelector('.search__button');
    if (!input.checkValidity()) {
      this._messageError();
      if (!autharizationEmailInput.checkValidity() || !autharizationPassInput.checkValidity()) {
        buttonInactive(secondFormButton);
      }
      if (!searchInput.checkValidity()) {
        buttonInactive(searchButton);
      }
      if (!regNameInput.checkValidity() || !regEmailInput.checkValidity() || !regPassInput.checkValidity()) {
        buttonInactive(firstFormButton);
      }
    }
     if (input.checkValidity()) {
      this._resetError();
      if (regNameInput.checkValidity() && regPassInput.checkValidity() && regEmailInput.checkValidity()) {
        buttonActive(firstFormButton);
      }
      if (autharizationPassInput.checkValidity() && autharizationEmailInput.checkValidity()) {
        buttonActive(secondFormButton);
      }
      if (searchInput.checkValidity()) {
        buttonActive(searchButton);
      }
    }
  }
}