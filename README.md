# news-explorer-frontend

## Фронтенд для новостного проекта

### Сссылка на проект https://igrek83.github.io/news-explorer-frontend/

### Описание

Проект по созданию сервиса "News Explorer" - поиск новостей по агрегаторам новостей в Интернет-СМИ по ключевому слову. На данном этапе реализована верстка макета проекта. Проект состоит из двух страниц - главной страницы и личного кабинета пользователя. Сайт адаптирован под все популярные разрешения устройств.

### Возможности сервиса

Реализовано: 
1. Адаптивная верстка двух страниц;
2. Инфраструктура проекта;
3. Открытие/закрытие окон регистрации/входа, а так же визуальное отображение окна, появляющегося после регистрации(временно для появления данного окна необходимо нажать на надпись NewsExplorer);
4. Реализована валидация форм, кнопки залочены/активны и меняют цвет, собственный текст ошибок(ошибки с сервера просто визуализированы и не работают);
5. при нажатии на иконку сохранения в первой карточке, она меняет цвет(пока для проверки визуального отображения), при наведении курсора на любую иконку карточек, в зависимости от страницы, появляется своя подсказка;
6. Preloader и блок, сообщающий об отсутствии найденных новостей временно встроены для проверки;

### Используемые технологии

Нативный JS, CSS, HTML, Webpack, GIT.

### Локальный запуск

1. Клонировать репозиторий
2. Установить отсутствующие модули npm
   ```
       npm install
   ```
3. Запустить локальный сервер
   ```
       npm run dev
   ```

### Продакшн сборка

1. Склонировать репозиторий
2. Доставить отсутствующие модули npm
   ```
       npm install
   ```
3. Запустить сборку проекта
   ```
       npm run build
   ```
4. Команда для деплоя на Github Pages
   ```
       npm run deploy
   ```