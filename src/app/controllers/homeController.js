const userRepository = require('../../repository/userRepository');
class HomeController {
    
    async get(req, res) {
        const users = await userRepository.getUsers();
        res.send(users);
    }
}


module.exports = new HomeController();