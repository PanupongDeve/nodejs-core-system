const hashHelpers = require('../../helpers/hash-helpers');
const jwtHelpers = require('../../helpers/jwt-helpers');
const userModel = require('../../datasoruce/mysql/mariadb/model/user');
const { ERROR_TYPE } = require('../../constant/errorType');
const { dbExceptionErrorHelpers } = require('../../helpers/db-exception-helpers');

class UserRepository {
    constructor() {
        this.passwordHashed = '';
        this.tester = false;
        this.handleError = (error) => {
            throw error;
        };
    }

    setIsTester(isTest = true) {
        this.tester = isTest;
    }

    setHandleError(customHandleError) {
        this.handleError = customHandleError;
    }

    setPasswordHash(passwordHashed) {
        this.passwordHashed = passwordHashed;
    }

    async signUp(users) {
        try {
            const { username, password, firstName, lastName } = users;
            const passwordHash = hashHelpers.hash(password);
            // store to db;

            const usersDBCreated = await userModel.create({ username, passwordHash, firstName, lastName });

            const userCreated = {
                firstName,
                lastName,
                username
            }

            const token = jwtHelpers.generate(userCreated);

            return {
                token,
                profile: userCreated
            };


        } catch (error) {
            const exception_error = {
                errorType: ERROR_TYPE.DB_EXCEPTION,
                message: dbExceptionErrorHelpers(error.errors)
            }
            this.handleError(exception_error);
        }
    }

    async getToken(users) {
        try {
            let passwordHashed = '';
            const { username, password } = users;
            // check username and recive passwordHash from db

            // use custom passwordHash for test;
            if (this.tester) {
                passwordHashed = this.passwordHashed
            }

            const user = await userModel.findOne({ where: { username } });
            if (user === null) {
                throw {
                    humanDetect: true,
                    message: "username and password incorrect!"
                 }
            }

            passwordHashed = user.passwordHash;
            

            if (!hashHelpers.compareHash(password, passwordHashed)) {
                throw {
                   humanDetect: true,
                   message: "username and password incorrect!"
                }
            }

            const userCreated = {
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username
            }

            const token = jwtHelpers.generate(userCreated);
            return {
                token,
                profile: userCreated
            };

        } catch (error) {
            let exception_error = null;
            if (error.humanDetect) {
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
            this.handleError(exception_error);
            
        }
    }

    async getUsers() {
        const users = await userModel.findAll();
        return users;
    }
}

module.exports = new UserRepository();