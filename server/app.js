const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const { PORT = 3000 } = process.env;

const helmet = require("helmet");
const { celebrate, Joi } = require("celebrate");

const userRouter = require("./routes/users");
const cardRouter = require("./routes/cards");
const auth = require("./middlewares/auth");

const { login, createUser } = require("./controllers/userControllers");

mongoose.connect("mongodb://localhost:27017/aroundb", {
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

app.use(express.json());

// protects app from web vulnerabilities by setting HTTP headers
app.use(helmet());

app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().unique().email(),
      password: Joi.string().required(),
    }),
  }),
  login
);
app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().unique().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  createUser
);

app.use("/", auth, userRouter);
app.use("/", auth, cardRouter);

app.get("*", (req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

// add server error if unexpected error occurs
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(500).send({
    message:
      statusCode === 500 ? "An error occurred on the server" : err.message,
  });
});

app.listen(PORT, () => {
  // if everything works fine, the console will show which port the application is listening to
  console.log(`App listening at port ${PORT}, k byeBYE!`);
});
