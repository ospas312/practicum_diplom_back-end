const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createArticle } = require('../controllers/articles');
const { getArticles, delArticleById } = require('../controllers/articles');


router.get('/articles', getArticles);

router.post('/articles', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().min(2),
    title: Joi.string().required().min(2),
    text: Joi.string().required().min(2),
    date: Joi.string().required().min(2),
    source: Joi.string().required().min(2),
    link: Joi.string().required().uri(),
    image: Joi.string().required().uri(),
  }),
}), createArticle);

router.delete('/articles/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().required().pattern(/^[a-f\d]{24}$/i),
  }),
}), delArticleById);


module.exports = router;
