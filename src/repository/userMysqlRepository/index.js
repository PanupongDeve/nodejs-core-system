const hashHelpers = require('../../helpers/hash-helpers');
const jwtHelpers = require('../../helpers/jwt-helpers');
const utilsHelpers = require('../../helpers/utils-helpers');
const userModel = require('../../datasoruce/mysql/mariadb/model/user');

const {
    generateMysqlErrorHelper, 
} = require('../../helpers/db-exception-helpers');

class UserMysqlRepository {
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
            const exception_error = generateMysqlErrorHelper(error);
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
                    incorrectData: true,
                    message: "username and password incorrect!"
                }
            }

            passwordHashed = user.passwordHash;


            if (!hashHelpers.compareHash(password, passwordHashed)) {
                throw {
                    incorrectData: true,
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
            const exception_error = generateMysqlErrorHelper(error);
            this.handleError(exception_error);
        }
    }

    async getUsers() {
        try {
            const users = await userModel.findAll();
            return this.getUsersDTO(users);
        } catch (error) {
            const exception_error = generateMysqlErrorHelper(error);
            this.handleError(exception_error);
        }
        
    }

    getUsersDTO(users) {
        const usersDTO = users.map(user => {
            return {
                "id": utilsHelpers.getDataWithNull(user.id),
                "firstName": utilsHelpers.getDataWithNull(user.firstName),
                "lastName": utilsHelpers.getDataWithNull(user.lastName),
                "username": utilsHelpers.getDataWithNull(user.username),
                "createdAt": utilsHelpers.getDataWithNull(user.createdAt),
                "updatedAt": utilsHelpers.getDataWithNull(user.updatedAt)
            }
        });
        return usersDTO
    }
}

module.exports = new UserMysqlRepository();