const blockInput = (button) => {
  if(button.hasAttribute('disabled')) {
    button.removeAttribute('disabled');
  } else {
    button.setAttribute('disabled', 'true');
  }
};
export default blockInput;