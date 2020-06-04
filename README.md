# practicum_diplom_back-end



# Дипломный проект, бэкенд.

*practicum_diplom_back-end_Nodejs_expressjs_Mongodb*

    Основная задача подготовить бэкенд и задеплоить его на сервер.
    Добавлены все необходимые инфраструктурные файлы: .gitignore, .editorconfig, .eslintrc. Инициализируйте package.json. Заполнен раздел scripts. dev запускает проект в режиме разработки с хот-релоудом, а start — в продакшн-режиме, без хот-релоуда. Созданы схемы и модели user, article. Созданны роуты и контроллеры.
    GET /users/me - возвращает информацию о пользователе (email и имя).
    GET /articles - возвращает все сохранённые пользователем статьи.
    POST /articles - создаёт статью с переданными в теле (keyword, title, text, date, source, link и image).
    DELETE /articles/articleId - удаляет сохранённую статью  по _id. 
    Роуты защищены авторизацией. 
    POST /signup - создаёт пользователя с переданными в теле (email, password и name).
    POST /signin -  проверяет переданные в теле почту и пароль и возвращает JWT. Реализованно логгирование.

    Создан сервер на Яндекс Облаке, и развернуто API. *IP проекта - 84.201.134.240* **домен проекта - www.perpetuum.space** ***API - api.perpetuum.space***


[ссылка на проект](https://github.com/ospas312/practicum_diplom_back-end)
ip проекта - 84.201.134.240
домен проекта - www.perpetuum.space
API - api.perpetuum.space

*Для запуска локально, скачайте проект, распакуйте в необходимую директорию, установите командой 'npm install' и запустите командой 'npm run start'.*
