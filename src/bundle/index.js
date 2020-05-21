import "../pages/index.css";
import Validate from '../js/components/Validate';
import RenderHeader from '../js/components/RenderHeader';
import Menu from '../js/components/Menu';
import Popup from '../js/components/Popup';
import Result from '../js/components/Result';
import NewsApi from '../js/api/NewsApi';
import MainApi from '../js/api/MainApi';
import HomeCardList from '../js/components/HomeCardList';
import config from '../js/constants/config';
import buttonInactive from '../js/utils/button-inactive';
import blockInput from '../js/utils/block-input';
import toggleItemButton from '../js/utils/toggle-item-button';
import entranceHeader from '../js/utils/entrance-header';
import errorHandler from '../js/utils/error-handler';
import submitError from '../js/utils/submit-error';
import secondSubmitError from '../js/utils/second-submit-error';
import resetSubmitError from '../js/utils/reset-submit-error';

const { NEWSAPI_URL, MAINAPI_URL, NEWSAPI_TOKEN, PAGESIZE, CARD_ROW } = config;
const newsApi = new NewsApi(NEWSAPI_URL, PAGESIZE, NEWSAPI_TOKEN);
const mainApi = new MainApi(MAINAPI_URL);

const outputButton = document.querySelector('#outputButton');
const regsEmailInput = document.querySelector('#regEmailInput');
const regsPassInput = document.querySelector('#regPassInput');
const regsNameInput = document.querySelector('#regNameInput');
const authorizationEmailInput = document.querySelector('#autharizationEmailInput');
const authorizationPassInput = document.querySelector('#autharizationPassInput');
const searchsInput = document.querySelector('#searchInput');

const authPopup = document.querySelector('#authPopup');
const autharizationPopup = document.querySelector('#autharizationPopup');
const miniPopup = document.querySelector('#miniPopup');

const headerMenu = document.querySelector('.header__menu');
const closeMenu = document.querySelector('.header__close-menu');

const newsContainer = document.querySelector('.result__news-container');

const searchButton = document.querySelector('.search__button');
const resultButton = document.querySelector('.result__button');
const authSubmitButton = document.querySelector('#authSubmitButton');
const autharizationSubmitButton = document.querySelector('#autharizationSubmitButton');

const authButton = document.querySelector('#authButton');
const secondAuthButton = document.querySelector('#secondAuthButton');
const autharizationButton = document.querySelector('#autharizationButton');
const secondAutharizationButton = document.querySelector('#secondAutharizationButton');

const regForm = document.forms.auth;
const autharizationForm = document.forms.autharization;
const searchForm = document.forms.search;

const renderHeader = new RenderHeader(outputButton);

const regNameInput = new Validate(regsNameInput);
const regPassInput = new Validate(regsPassInput);
const regEmailInput = new Validate(regsEmailInput);
const autharizationEmailInput = new Validate(authorizationEmailInput);
const autharizationPassInput = new Validate(authorizationPassInput);
const searchInput = new Validate(searchsInput);
const result = new Result();

const menu = new Menu(headerMenu, closeMenu);
const firstPopup = new Popup(authButton, authPopup);
const firstDoublePopup = new Popup(secondAuthButton, authPopup);
const secondPopup = new Popup(autharizationButton, autharizationPopup);
const secondDoublePopup = new Popup(secondAutharizationButton, miniPopup);
const homeCardList = new HomeCardList(newsContainer);

entranceHeader();
if (localStorage.getItem('token')) {
  renderHeader.renderUserName(mainApi.getUserData());
}


const auth = () => {
  event.preventDefault();
  blockInput(regsEmailInput);
  blockInput(regsPassInput);
  blockInput(regsNameInput);
  buttonInactive(authSubmitButton);
  const email = regForm.elements.regEmailInput;
  const password = regForm.elements.regPassInput;
  const name = regForm.elements.regNameInput;
  mainApi.signup(email.value, password.value, name.value)
  .then(() => {
    resetSubmitError();
    firstPopup.closing();
    secondDoublePopup.openMiniPopup();
  })
  .catch((err) => {
    errorHandler(err, submitError, 'Нет связи с сервером');
  })
  .finally(() => {
    blockInput(regsEmailInput);
    blockInput(regsPassInput);
    blockInput(regsNameInput);
    regForm.reset();
  });
};
 
const autharization = () => {
  event.preventDefault();
  blockInput(authorizationEmailInput);
  blockInput(authorizationPassInput);
  buttonInactive(autharizationSubmitButton);
  const email = autharizationForm.elements.autharizationEmailInput;
  const password = autharizationForm.elements.autharizationPassInput;
  mainApi.signin(email.value, password.value) 
  .then((data) => {
    localStorage.setItem('token', data.token);
    toggleItemButton();
    entranceHeader();
    renderHeader.renderUserName(mainApi.getUserData());
    resetSubmitError();
    secondPopup.closing();
  })
   .catch((err) => {
    errorHandler(err, secondSubmitError, 'Нет связи с сервером');
  })
  .finally(() => {
    blockInput(authorizationPassInput);
    blockInput(authorizationEmailInput);
    autharizationForm.reset();
  })
};

const searchNews = (event) => {
  event.preventDefault();
  blockInput(searchsInput);
  buttonInactive(searchButton);
  result.delNotFoundResult();
  result.delCathResult();
  result.delNewsResult();
  result.addResult();
  result.delButton();
  result.preloader();
  homeCardList.deleteCards();
  const search = searchForm.elements.searchInput;
  newsApi
  .getNews(search.value)
  .then((res) => { 
    result.key = search.value;
    result.array = res;
    result.addNewsResult();
    if (res.articles.length > 0) {
      for (let i = 0; i < CARD_ROW; i++) {
        if (result.array.articles[i]) {
          homeCardList.addHomeCard(result.key, result.array.articles[i]);
        } else {
          break;
        }
      }
      if (res.articles.length > CARD_ROW) {
        result.addButton();
        result.counter = 3;
      } 
    } else if (result.array.articles.length === 0) {
      result.addNotFoundResult();
      result.delNewsResult();
    }
  })
  .catch(() => {
    result.addCathResult();
    result.delNewsResult();
  })
  .finally(() => {
    result.preloader();
    searchForm.reset();
    blockInput(searchsInput);
  })
};

//по 3 карточки
const addCardRow = () => {
  for (let i = result.counter; i < result.counter + CARD_ROW; i++) {
    if (result.array.articles[i]) {
      homeCardList.addHomeCard(result.key, result.array.articles[i]);
    } else {
      result.delButton();
      break;
    }
  }
  result.counter += CARD_ROW;
};

function toggleArticleServer(event) {
  if(event.target.classList.contains('result__item-save_theme_aktive')) {
    const container = event.target.closest('.result__item');
    const url = container.querySelector('.link');
    const article = [];
    article.keyword = container.querySelector('.result__key').textContent;
    article.title = container.querySelector('.result__item-title').textContent;
    article.text = container.querySelector('.result__text').textContent;
    article.date = container.querySelector('.result__date').textContent;
    article.source = container.querySelector('.result__source').textContent;
    article.link = url.href;
    article.image = container.querySelector('.result__item-header').style.backgroundImage.slice(5, -2);
    mainApi.addingArticle(article)
    .then((res) => {
      container.setAttribute('data-id', res.data._id);
    })
    .catch(() => {
      alert('Нет связи с сервером');
    })
  }
  if(event.target.classList.contains('result__item-save_theme_inaktive')) {
    const articleId = event.target.closest('.result__item').dataset.id;
    mainApi.deleteArticle(articleId);
  }
}
authSubmitButton.addEventListener('click', auth);
autharizationSubmitButton.addEventListener('click', autharization);
searchButton.addEventListener('click', searchNews);
resultButton.addEventListener('click', addCardRow);
newsContainer.addEventListener('click', toggleArticleServer);