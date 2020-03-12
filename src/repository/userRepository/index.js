const hashHelpers = require('../../helpers/hash-helpers');
const jwtHelpers = require('../../helpers/jwt-helpers');
const user = require('../../datasoruce/mysql/mariadb/model/user');

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

    async signUp(username, password) {
        try {
            const passwordHash = hashHelpers.hash(password);
            // store to db;
            const userCreated = {
                username,
                passwordHash
            }

            const token = jwtHelpers.generate(userCreated);
            const profile = jwtHelpers.verify(token);
            return {
                token,
                profile
            };


        } catch (error) {
            this.handleError(error);
        }
    }

    async getToken(username, password) {
        try {
            let passwordHashed = '';
            // check username and recive passwordHash from db

            // use custom passwordHash for test;
            if (this.tester) {
                passwordHashed = this.passwordHashed
            }

            if (!hashHelpers.compareHash(password, passwordHashed)) {
                throw {
                    message: "username and password incorrect!"
                }
            }

            const userCreated = {
                username,
                passwordHashed: passwordHashed
            }

            const token = jwtHelpers.generate(userCreated);
            const profile = jwtHelpers.verify(token);
            return {
                token,
                profile
            };

        } catch (error) {
            console.log(error.message);
            this.handleError(error);
            
        }
    }

    async getUsers() {
        const users = await user.findAll();
        return users;
    }
}

module.exports = new UserRepository();