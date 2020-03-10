const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../environments/hash-environments');

class HashHelpers {
    getSaltRouns() {
        return SALT_ROUNDS;
    }

    hash(password) {
        const salt = bcrypt.genSaltSync(SALT_ROUNDS);
        const hash = bcrypt.hashSync(password, salt);
        return hash;
    }

    compareHash(password, passwordHashed) {
        return bcrypt.compareSync(password, passwordHashed);
    }
}

module.exports = new HashHelpers();