const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const { PORT = 3000 } = process.env;

const helmet = require('helmet');
const { celebrate, Joi, errors } = require('celebrate');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const {
  RequestError,
  CastError,
  AuthError,
  ForbiddenError,
  NotFoundError,
} = require('./middlewares/errors');

const { login, createUser } = require('./controllers/userControllers');
const { request } = require('express');
const cors = require('cors');

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(express.json());

app.use(helmet());
app.use(cors());
app.options('*', cors());
app.use(requestLogger);

app.post('/signin', login);
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  createUser
);

app.use('/', auth, userRouter);
app.use('/', auth, cardRouter);

app.get('*', (req, res) => {
  throw new NotFoundError('Requested resource not found');
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'An error occurred on the server' : message,
  });
});

app.listen(PORT, () => {});
