export default function toggleItemButton() {
  const itemSaves = document.querySelectorAll('.result__item-save');
  const resultHints = document.querySelectorAll('.result__hint');
  if(localStorage.getItem('token')) {
    itemSaves.forEach(function(item) {
      item.removeAttribute('disabled');
    });
    resultHints.forEach(function(item) {
      item.classList.remove('is-opened');
    })
  } else {
    itemSaves.forEach(function(item) {
      item.setAttribute('disabled', 'true');
      item.classList.remove('result__item-save_theme_aktive');
      item.classList.add('result__item-save_theme_inaktive');
    });
    resultHints.forEach(function(item) {
      item.classList.add('is-opened');
    });
  }
}