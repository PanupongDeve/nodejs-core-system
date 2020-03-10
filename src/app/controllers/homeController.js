
class HomeController {
    
    async get(req, res) {
        res.send('hello');
    }
}


module.exports = new HomeController();