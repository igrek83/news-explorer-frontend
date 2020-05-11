import "../pages/office-page/office.css";
import MainApi from '../js/api/MainApi';
import RenderHeader from '../js/components/RenderHeader';
import Menu from '../js/components/Menu';
import config from '../js/constants/config';
import OfficeCard from '../js/components/OfficeCard';

const officeCard = new OfficeCard();
const { MAINAPI_URL } = config;
const mainApi = new MainApi(MAINAPI_URL);
const renderHeader = new RenderHeader(document.querySelector('#officeOutputButton'));
const menu = new Menu(document.querySelector('.header__menu'), document.querySelector('.header__close-menu'));

const array = [];
const result = [];
renderHeader.renderUserName(mainApi.getUserData());

mainApi.getArticles()
.then((res) => {
  for (let i = 0; i < res.data.length; i++) {
    officeCard.create(res.data[i]);
    array.push(res.data[i].keyword);
  }
  array.forEach(function(item){
    if (result[item] != undefined) {
      ++result[item];
    } else  {
      result[item] = 1;
    }
  });
  const keysSorted = Object.keys(result).sort(function(a,b){return result[b]-result[a]});
  const firstKey = keysSorted[0];
  const secondKey = keysSorted[1];
  const keySumma = keysSorted.length - 2;
  let text = document.querySelector('.result__text-bold');
    
  if (firstKey === undefined) {
    text.textContent = 'нет сохраненных Вами статей';
  }
  if (secondKey === undefined) {
    text.textContent = firstKey;
  } else {
    text.textContent = firstKey+', '+secondKey+' и '+keySumma+' другим';
  }
  let name = document.querySelector('#userName').textContent;
  let number = res.data.length;
  document.querySelector('#articlesSumma').textContent = name+', у Вас '+number+' сохраненных статей';   
})
.catch(() => {
  window.location.href = '../index.html';
});

function deleteArticleServer(event) {
if(event.target.classList.contains('result__item-del')) {
  let articleId = event.target.closest('.result__item').dataset.id;
  mainApi.deleteArticle(articleId);
  }
}

document.querySelector('.result__news-container').addEventListener('click',deleteArticleServer);