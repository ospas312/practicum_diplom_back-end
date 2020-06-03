const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createArticle } = require('../controllers/articles');
const { getArticles, delArticleById } = require('../controllers/articles');


router.get('/articles', getArticles);

router.post('/articles', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().min(2).max(30),
    title: Joi.string().required().min(2).max(40),
    text: Joi.string().required().min(2),
    date: Joi.date(),
    source: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri(),
    image: Joi.string().required().uri(),
  }),
}), createArticle);

router.delete('/articles/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().pattern(/^[a-f\d]{24}$/i),
  }),
}), delArticleById);


module.exports = router;
