const buttonInactive = (element) => {
  element.setAttribute('disabled', 'true');
  element.classList.remove('button_color_blue');
  element.classList.add('button_color_gray');
};
export default buttonInactive;