const { ERROR_TYPE } = require('../constant/errorType');

const dbExceptionErrorHelpers = (errors) => {
    const messagesError = errors.map(error => {
        return error.message
    })
    
    return messagesError;
}

const generateMysqlErrorHelper = (error) => {
    let exception_error = null;

    if(error.name === 'SequelizeConnectionRefusedError') {
        exception_error = {
            errorType: ERROR_TYPE.DB_EXCEPTION,
            message: 'ConnectionRefusedError'
        }
    } else if (error.incorrectData) {
        exception_error = {
            errorType: ERROR_TYPE.VALIDATE_EXCEPTION,
            message: error.message
        }
    } else {
        exception_error = {
            errorType: ERROR_TYPE.DB_EXCEPTION,
            message: dbExceptionErrorHelpers(error.errors)
        }
    }

    return exception_error;
}

const generateMongoDBErrorHelper = (error) => { 
    let exception_error = null;

    return error;
}



module.exports = {
    dbExceptionErrorHelpers,
    generateMysqlErrorHelper,
    generateMongoDBErrorHelper
};