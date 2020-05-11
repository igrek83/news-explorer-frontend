const buttonActive = (element) => {
  element.removeAttribute('disabled');
  element.classList.remove('button_color_gray');
  element.classList.add('button_color_blue');
}
export default buttonActive;