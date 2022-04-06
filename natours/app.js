const express = require('express');
const morgan = require('morgan');

const app = express();
const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');

//MIDDLEWARE
//BUILTIN MIDDLEWARE
if (process.env.ENV_VARIABLE == 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());

//APLICATION MIDDLEWARE
app.use((req, res, next) => {
  console.log('hello from the first midleware');
  next();
});

//ROUTE
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
module.exports = app;
