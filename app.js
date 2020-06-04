require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const { limiter } = require('./middlewares/limiter');
const { celebrateError } = require('./middlewares/celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT, DATABASE_URL, mongooseConfig } = require('./config');

const app = express();

mongoose
  .connect(DATABASE_URL, mongooseConfig)
  .catch((err) => {
    throw new Error(err);
  });

app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);

app.use('/', require('./routes/index'));

app.use(errorLogger);
app.use(celebrateError);


app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  next();
});
app.listen(PORT);
