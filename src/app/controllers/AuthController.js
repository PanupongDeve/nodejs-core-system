const userRepository = require('../../repository/userRepository');
const {
    responseSender
}  = require('../../helpers/response-helpers');
const RESPONSE_STATUS= require('../../constant/responseStatus');
const authVlidator = require('../../validators/AuthVlidator');
class AuthController {
    
    async signUp(req, res) {
        try {
            if (authVlidator.validateforSignUp(req.body)) {
                const data = await userRepository.signUp(req.body);
                responseSender(data, RESPONSE_STATUS.CREATED)(res);
            }
            
        } catch (error) {
            responseSender(error, RESPONSE_STATUS.BAD_REQUEST)(res);
        }
        
    }

    async getToken(req, res) {
        try {
            if (authVlidator.validateforGetToken(req.body)) {
                const data = await userRepository.getToken(req.body);
                responseSender(data, RESPONSE_STATUS.OK)(res);
            }
        } catch (error) {
            responseSender(error, RESPONSE_STATUS.BAD_REQUEST)(res);
        }
        
    }
}


module.exports = new AuthController();