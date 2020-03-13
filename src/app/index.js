const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

const homeRouter = require('./routes/home');
const authRouter = require('./routes/auth');

const RESPONSE_STATUS = require('../constant/responseStatus');
const { ERROR_TYPE } = require('../constant/errorType');
const { responseSender } = require('../helpers/response-helpers');

// [SETUP] - MIDDLEWARE
app.use(helmet());
app.disable('x-powered-by');
app.use(cors());
app.use(bodyParser.json());
app.use (function (error, req, res, next){
    responseSender({
        errorType: ERROR_TYPE.VALIDATE_EXCEPTION,
        message: error.type
    }, RESPONSE_STATUS.BAD_REQUEST)(res)
});

app.use(bodyParser.urlencoded({ extended: false }));
// [SETUP] - ROUTER

app.use('/', homeRouter);
app.use('/token', authRouter);

module.exports = app;