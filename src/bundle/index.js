import "../pages/index.css";
import Validate from '../js/components/Validate';
import RenderHeader from '../js/components/RenderHeader';
import Menu from '../js/components/Menu';
import Popup from '../js/components/Popup';
import HomeCard from '../js/components/HomeCard';
import Result from '../js/components/Result';
import NewsApi from '../js/api/NewsApi';
import MainApi from '../js/api/MainApi';
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

const renderHeader = new RenderHeader(document.querySelector('#outputButton'));
const regNameInput = new Validate(document.querySelector('#regNameInput'));
const regPassInput = new Validate(document.querySelector('#regPassInput'));
const regEmailInput = new Validate(document.querySelector('#regEmailInput'));
const autharizationEmailInput = new Validate(document.querySelector('#autharizationEmailInput'));
const autharizationPassInput = new Validate(document.querySelector('#autharizationPassInput'));
const searchInput = new Validate(document.querySelector('#searchInput'));
const result = new Result();
const authPopup = document.querySelector('#authPopup');
const autharizationPopup = document.querySelector('#autharizationPopup');
const miniPopup = document.querySelector('#miniPopup');
const menu = new Menu(document.querySelector('.header__menu'), document.querySelector('.header__close-menu'));
const firstPopup = new Popup(document.querySelector('#authButton'), authPopup);
const firstDoublePopup = new Popup(document.querySelector('#secondAuthButton'), authPopup);
const secondPopup = new Popup(document.querySelector('#autharizationButton'), autharizationPopup);
const secondDoublePopup = new Popup(document.querySelector('#secondAutharizationButton'), miniPopup);
const homeCard = new HomeCard();

const regForm = document.forms.auth;
const autharizationForm = document.forms.autharization;
const searchForm = document.forms.search;

entranceHeader();
renderHeader.renderUserName(mainApi.getUserData());

const auth = () => {
  event.preventDefault();
  blockInput(document.querySelector('#regEmailInput'));
  blockInput(document.querySelector('#regPassInput'));
  blockInput(document.querySelector('#regNameInput'));
  let email = regForm.elements.regEmailInput;
  let password = regForm.elements.regPassInput;
  let name = regForm.elements.regNameInput;
  mainApi.signup(email.value, password.value, name.value)
  .then(() => {
    regForm.reset();
    resetSubmitError();
    firstPopup.closing();
    secondDoublePopup.openMiniPopup();
  })
  .catch((err) => {
    errorHandler(err, submitError, 'Нет связи с сервером');
  })
  .finally(() => {
    blockInput(document.querySelector('#regEmailInput'));
    blockInput(document.querySelector('#regPassInput'));
    blockInput(document.querySelector('#regNameInput'));
  });
};
 
const autharization = () => {
  event.preventDefault();
  blockInput(document.querySelector('#autharizationEmailInput'));
  blockInput(document.querySelector('#autharizationPassInput'));
  let email = autharizationForm.elements.autharizationEmailInput;
  let password = autharizationForm.elements.autharizationPassInput;
  mainApi.signin(email.value, password.value) 
  .then((data) => {
    localStorage.setItem('token', data.token);
    toggleItemButton();
    entranceHeader();
    renderHeader.renderUserName(mainApi.getUserData());
    autharizationForm.reset();
    resetSubmitError(document.querySelector('#autharizationError'));
    secondPopup.closing();
  })
   .catch((err) => {
    errorHandler(err, secondSubmitError, 'Нет связи с сервером');
  })
  .finally(() => {
    blockInput(document.querySelector('#autharizationEmailInput'));
    blockInput(document.querySelector('#autharizationPassInput'));
  })
};

const searchNews = (event) => {
  event.preventDefault();
  blockInput(document.querySelector('#searchInput'));
  buttonInactive(document.querySelector('.search__button'));
  result.addResult();
  result.preloader();
  let search = searchForm.elements.searchNews;
  newsApi
  .getNews(search.value)
  .then((res) => { 
    result.key = search.value;
    result.array = res;
    result.preloader();
    result.addNewsResult();
    if (res.articles.length > 0) {
      for (let i = 0; i < CARD_ROW; i++) {
        if (result.array.articles[i]) {
          homeCard.create(result.key, result.array.articles[i]);
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
    }
  })
  .catch(() => {
    result.addCathResult();
  })
  .finally(() => {
    searchForm.reset();
    blockInput(document.querySelector('#searchInput'));
  })
};

//по 3 карточки
const addCardRow = () => {
  for (let i = result.counter; i < result.counter + CARD_ROW; i++) {
    if (result.array.articles[i]) {
      homeCard.create(result.key, result.array.articles[i]);
    } else {
      result.delButton();
      break;
    }
  }
  result.counter += CARD_ROW;
};

function toggleArticleServer(event) {
  if(event.target.classList.contains('result__item-save_theme_aktive')) {
    let container = event.target.closest('.result__item');
    let url = container.querySelector('.link');
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
    let articleId = event.target.closest('.result__item').dataset.id;
    mainApi.deleteArticle(articleId);
  }
}

document.querySelector('#authSubmitButton').addEventListener('click', auth);
document.querySelector('#autharizationSubmitButton').addEventListener('click', autharization);
document.querySelector('.search__button').addEventListener('click', searchNews);
document.querySelector('.result__button').addEventListener('click', addCardRow);
document.querySelector('.result__news-container').addEventListener('click', toggleArticleServer);