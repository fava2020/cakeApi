const express = require('express');
const bodyParser = require('body-parser');

const cakesRoutes = require('./routes/cakes');

const app = express();

const dbUtil = require('./util/db');
const constants = require('./util/constants');

// application/json
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/', cakesRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || constants.STATUS_CODE_INTERNAL_SERVER_ERROR;
  const message = error.message;
  res.status(status).json({
    message: message
  });
});

app.use((req, res, next) => {
  res.status(constants.STATUS_CODE_NOT_FOUND).json({
    message: constants.ERROR_NOT_FOUND
  });
});

dbUtil.connectToDb(function (err) {
  if (err) console.log(err);
  app.listen(constants.PORT, () => console.log(`App listening on port ${constants.PORT}!`));
});