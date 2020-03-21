const mongoose = require('mongoose');
const { 
    MONGO_DB_ENDPOINT,
    MONGO_DB_PORT,
    MONGO_DB_NAME,
    MONGO_DB_USERNAME,
    MONGO_DB_PASSWORD 
} = require('../../../environments/mongodb-environments');

const MONGO_URI = `mongodb://${MONGO_DB_USERNAME}:${MONGO_DB_PASSWORD}@${MONGO_DB_ENDPOINT}:${MONGO_DB_PORT}/${MONGO_DB_NAME}`;

mongoose.connect(MONGO_URI);

const { connection } = mongoose;

connection.on('error', console.error.bind(console, 'MONGODB DATABASE ---> STATUS: FAIL'));
connection.once('open', () => {
    console.log('MONGODB DATABASE ---> STATUS: OPENING');
});