## Available Scripts

### `npm i`

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm install -g json-server` (перед запуском нужно установить глобально)

запускаем json-server

### `npm run server`
### `json-server --watch db.json --port 8000`
Open [http://localhost:8000/lessons](http://localhost:3000/lessons) to view it in the browser server.

Использованы технологии: React, React-router-dom, Node-sass, json-server


Тестовое задание:

1.	Сверстать 3х колоночный макет. Основное содержимое страницы фиксировано по ширине и центрируется по окну браузера; Макет должен содержать: меню, контент и футер.
2.	Меню должно содержать выпадающие подпункты
3.	На основной странице нужно реализовать систему принятия решений (например, система, которая анализирует, получит ли студент зачет автоматом).
      Нужно реализовать ввод названия предмета, количество оценок (исходя из этого количества выводить поля для внесения этих оценок), также должны быть поля для подсчета доли пропущенных занятий по уважительной и неуважительной причине.
4.	Осуществить проверку полей на пустоту, на допустимость значений, деление на ноль. После проверки вывести результат (например, если средний балл больше 4 и доля пропущенных по неуважительной < 10 %, то зачет получен).
5.	Предусмотреть отправку этих результатов на сервер. 


