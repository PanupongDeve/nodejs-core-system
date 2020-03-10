const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

const homeRouter = require('./routes/home');

// [SETUP] - MIDDLEWARE
app.use(helmet());
app.disable('x-powered-by');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// [SETUP] - ROUTER

app.use('/', homeRouter);

module.exports = app;