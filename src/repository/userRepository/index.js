const userMysqlRepository = require('../userMysqlRepository');
const userMongoRepository = require('../userMongoRepository');
class UserRepository {
    constructor() {    
        this.userMysqlRepository = userMysqlRepository;
        this.userMongoRepository = userMongoRepository;
    }

    async signUp(users) {
        return await this.userMongoRepository.signUp(users);
    }

    async getToken(users) { 
        return await this.userMongoRepository.getToken(users);
    }

    async getUsers() {
        return await this.userMongoRepository.getUsers();
        
    }
}

module.exports = new UserRepository();