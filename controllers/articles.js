const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((card) => res.send({ data: card }))
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
    .then((card) => res.send({ data: card }))
    .catch(next);
};
module.exports.delArticleById = (req, res, next) => {
  Article.findById(req.params.id).select('+owner')
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Not found id');
      }
      const { owner } = card;
      return owner;
    })
    .then((owner) => {
      if (owner.toString() !== req.user._id) {
        throw new ForbiddenError('Not enough rights delete');
      }
      return Article.findByIdAndRemove(req.params.id).select('-owner')
        .then((card) => {
          res.send({ data: card });
        })
        .catch(() => {
          throw new NotFoundError('an error occurred');
        });
    })
    .catch(next);
};
