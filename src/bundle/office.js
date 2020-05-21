import "../pages/office-page/office.css";
import MainApi from '../js/api/MainApi';
import RenderHeader from '../js/components/RenderHeader';
import Menu from '../js/components/Menu';
import config from '../js/constants/config';
import OfficeCardList from '../js/components/OfficeCardList';


const newsContainer = document.querySelector('.result__news-container');
const articleSumma = document.querySelector('#articlesSumma');

const officeCardList = new OfficeCardList(newsContainer);

const headerMenu = document.querySelector('.header__menu');
const closeMenu = document.querySelector('.header__close-menu');

const { MAINAPI_URL } = config;
const mainApi = new MainApi(MAINAPI_URL);
const renderHeader = new RenderHeader(document.querySelector('#officeOutputButton'));

const menu = new Menu(headerMenu, closeMenu);

const arrayKeywords = [];
const resultKeywords = [];
renderHeader.renderUserName(mainApi.getUserData());

mainApi.getArticles()
.then((res) => {
  res.data.forEach(function(item) {
    officeCardList.addOfficeCard(item);
    arrayKeywords.push(item.keyword);
  });
  arrayKeywords.forEach(function(item){
    if (resultKeywords[item] != undefined) {
      ++resultKeywords[item];
    } else  {
      resultKeywords[item] = 1;
    }
  });
  const keysSorted = Object.keys(resultKeywords).sort(function(a,b){return resultKeywords[b]-resultKeywords[a]});
  const firstKey = keysSorted[0];
  const secondKey = keysSorted[1];
  const keySumma = keysSorted.length - 2;
  const text = document.querySelector('.result__text-bold');
    
  if (firstKey === undefined) {
    text.textContent = 'нет сохраненных Вами статей';
  }
  if (secondKey === undefined) {
    text.textContent = firstKey;
  } else {
    text.textContent = firstKey+', '+secondKey+' и '+keySumma+' другим';
  }
  const name = document.querySelector('#userName').textContent;
  const number = res.data.length;
  articleSumma.textContent = name+', у Вас '+number+' сохраненных статей';   
})
.catch(() => {
  window.location.href = '../index.html';
});

function deleteArticleServer(event) {
if(event.target.classList.contains('result__item-del')) {
  const articleId = event.target.closest('.result__item').dataset.id;
  mainApi.deleteArticle(articleId)
    .then(() => {
      const item = event.target.closest('.result__item');
      item.parentNode.removeChild(item);
    })
    .catch(() => {
      alert('Нет связи с сервером');
    });
  }
}

newsContainer.addEventListener('click',deleteArticleServer);