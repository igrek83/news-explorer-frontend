import errors from '../constants/errors.js';
const { 
  NAME_ERROR,
  EMAIL_ERROR,
  PASS_ERROR,
  EMAIL_FORMAT_ERROR,
  AT_LEAST_TWO_ERROR,
  AT_LEAST_EIGHT_ERROR
 } = errors;
export default class ErrorValidate {
  constructor(input) {
    this.input = input;
  }
  _messageError() {
    const element = this.input;
    const error = element.nextElementSibling;
    error.classList.add('visibility');
    if(element.validity.tooShort === true) {
      if(element === regNameInput || element === searchInput) {
        error.textContent = AT_LEAST_TWO_ERROR;
        return;
      }
      if(element === regPassInput || element === autharizationPassInput) {
        error.textContent = AT_LEAST_EIGHT_ERROR;
        return;
      }
      return;
    }
    if(element.validity.valueMissing === true) {
      if(element === regNameInput) {
        error.textContent = NAME_ERROR;
        return;
      }
      if(element === regPassInput || element === autharizationPassInput) {
        error.textContent = PASS_ERROR;
        return;
      }
      if(element === regEmailInput || element === autharizationEmailInput) {
        error.textContent = EMAIL_ERROR;
        return;
      }
      return;
    }
    if(element.validity.typeMismatch) {
      error.textContent = EMAIL_FORMAT_ERROR;
    }
  }
  _resetError() {
    this.input.nextElementSibling.classList.remove('visibility');
    this.input.nextElementSibling.texcontent = "";
  }
}