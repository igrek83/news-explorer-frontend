export default function entranceHeader() {
  if(localStorage.getItem('token')) {
    document.querySelector('#authButton').classList.remove('is-opened');
    document.querySelector('#outputButton').classList.add('is-opened');
    document.querySelector('#saveArticles').classList.remove('is-closed');
  } else {
    document.querySelector('#authButton').classList.add('is-opened');
    document.querySelector('#outputButton').classList.remove('is-opened');
    document.querySelector('#saveArticles').classList.add('is-closed');
  }
}