const express = require('express');

const app = express();

const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const helmet = require('helmet');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

/**
  * adds a user object to each request
  * middleware
  * hard coded _id - temporary solution
  */

app.use((req, res, next) => {
  req.user = {
    _id: '606d2817d0fa281c58a5464c', // paste the _id of the test user created in the previous step
  };
  next(); // moves to next middleware
});
app.use(express.json());

// protects app from web vulnerabilities by setting HTTP headers
app.use(helmet());
app.use('/', userRouter);
app.use('/', cardRouter);
app.get('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.listen(PORT, () => {
  // if everything works fine, the console will show which port the application is listening to
  console.log(`App listening at port ${PORT}, k byeBYE!`);
});
