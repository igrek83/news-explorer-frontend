export default function toggleItemButton() {
  const array = document.querySelectorAll('.result__item-save');
  const secondArray = document.querySelectorAll('.result__hint');
  if(localStorage.getItem('token')) {
    array.forEach(function(item) {
      item.removeAttribute('disabled');
    });
    secondArray.forEach(function(item) {
      item.classList.remove('is-opened');
    })
  } else {
    array.forEach(function(item) {
      item.setAttribute('disabled', 'true');
      item.classList.remove('result__item-save_theme_aktive');
      item.classList.add('result__item-save_theme_inaktive');
    });
    secondArray.forEach(function(item) {
      item.classList.add('is-opened');
    });
  }
}