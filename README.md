# Fix-Repair
Тетовое задание для M18

## Что включает в себя сборка?
"@babel/cli": "^7.19.3",
"@babel/core": "^7.20.2",
"@babel/node": "^7.20.2",
"@babel/preset-env": "^7.20.2",
"autoprefixer": "^10.4.13",
"browser-sync": "^2.27.10",
"gulp": "^4.0.2",
"gulp-babel": "^8.0.0",
"gulp-concat": "^2.6.1",
"gulp-cssnano": "^2.1.3",
"gulp-htmlmin": "^5.0.1",
"gulp-imagemin": "^7.1.0",
"gulp-postcss": "^9.0.1",
"gulp-uglify-es": "^3.0.0",
"postcss-variables": "^1.1.1",
"stylelint": "^14.14.1",
"stylelint-config-standard": "^29.0.0",
"stylelint-order": "^5.0.0",
"stylelint-order-config-standard": "^0.1.3"

## Как пользоваться?
* Установить ```Node JS```
* Устанавливаем ```Gulp``` в папку с проектом ```$ npm install gulp --save-dev```;

## Начало работы
* Устанавливаем пакеты из package.json: ```npm i```, при установке gulp они автоматически должны подтянуться, если этого не произойдет, то ```npm i```;
* Основная команда: ```gulp``` запускает слежку за файлами, ```gulp-watch``` и ```browserSync```
* Сборка проекта: ```gulp build``` проект собирается в дире ```dist``` (создается сама)
