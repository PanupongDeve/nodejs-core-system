require('dotenv').config();

const environments = {
    MONGO_DB_ENDPOINT: process.env.MONGO_DB_ENDPOINT || 'localhost',
    MONGO_DB_PORT: process.env.MONGO_DB_PORT || 27017,
    MONGO_DB_NAME: process.env.MONGO_DB_NAME || 'test',
    MONGO_DB_USERNAME: process.env.MONGO_DB_USERNAME || 'root',
    MONGO_DB_PASSWORD: process.env.MONGO_DB_PASSWORD || '',
}

module.exports = environments;