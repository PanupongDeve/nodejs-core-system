const { ERROR_TYPE }  = require('../constant/errorType');

class AuthVlidator {
    validateforSignUp(body) {
        try {
            const { username, password, firstName, lastName } = body;
            if (!username) {
                throw "username must require";
            } else if (!password) {
                throw "password must require";
            } else if (!firstName) {
                throw "firstName must require";
            } else if (!lastName) {
                throw "lastName must require";
            } else {
                return true;
            }
        } catch (error) {
            const exception_error = {
                errorType: ERROR_TYPE.VALIDATE_EXCEPTION,
                message: error
            }
            throw exception_error
        }
    }

    validateforGetToken(body) {
        try {
            const { username, password, firstName, lastName } = body;
            if (!username) {
                throw "username must require";
            } else if (!password) {
                throw "password must require";
            } else {
                return true;
            }
        } catch (error) {
            const exception_error = {
                errorType: ERROR_TYPE.VALIDATE_EXCEPTION,
                message: error
            }
            throw exception_error
        }
    }
}

module.exports = new AuthVlidator();