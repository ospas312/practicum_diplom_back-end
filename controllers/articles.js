const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((article) => res.send({ data: article }))
    .catch(next);
};
module.exports.createArticle = (req, res, next) => {
  const owner = req.user._id;
  const {
    keyword, title, text,
    date, source, link, image,
  } = req.body;
  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => Article.findById({ _id: article._id }))
    .then((article) => res.send({ data: article }))
    .catch(next);
};
module.exports.delArticleById = (req, res, next) => {
  Article.findById(req.params.articleId).select('+owner')
    .then((article) => {
      if (!article) {
        throw new NotFoundError('Not found id');
      }
      const { owner } = article;
      return owner;
    })
    .then((owner) => {
      if (owner.toString() !== req.user._id) {
        throw new ForbiddenError('Not enough rights delete');
      }
      return Article.findByIdAndRemove(req.params.articleId).select('-owner')
        .then((article) => {
          res.send({ data: article });
        })
        .catch(() => {
          throw new NotFoundError('an error occurred');
        });
    })
    .catch(next);
};
