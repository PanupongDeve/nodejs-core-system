const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../environments/jwt-environments');

class JWTHelpers {
    verify(token) {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    }

    generate(data) {
        const token = jwt.sign(data, JWT_SECRET);
        return token;
    }

    getJWTSecret() {
        return JWT_SECRET;
    }
}

module.exports = new JWTHelpers();