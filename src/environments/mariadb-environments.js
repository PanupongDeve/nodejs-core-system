require('dotenv').config();

const environments = {
    DB_ENDPOINT: process.env.DB_ENDPOINT || 'localhost',
    DB_NAME: process.env.DB_NAME || 'test',
    DB_USERNAME: process.env_DB_USERNAME || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    DB_TIMEZONE: process.env.DB_TIMEZONE || 'Asia/Bangkok'
}

module.exports = environments;