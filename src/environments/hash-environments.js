require('dotenv').config();

const environments = {
    SALT_ROUNDS: Number(process.env.SALT_ROUNDS) || 10
}

module.exports = environments;