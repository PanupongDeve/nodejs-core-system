const userRepository = require('../../repository/userRepository');
const {
    responseSender
}  = require('../../helpers/response-helpers');
const RESPONSE_STATUS= require('../../constant/responseStatus');
class HomeController {
    
    async get(req, res) {

        try {
            const data = await userRepository.getUsers();
            responseSender(data, RESPONSE_STATUS.OK)(res);
        } catch (error) {
            responseSender(error, RESPONSE_STATUS.BAD_REQUEST)(res);
        }
        
    }
}


module.exports = new HomeController();