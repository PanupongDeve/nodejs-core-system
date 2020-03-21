const mongoose = require('mongoose');
const { Schema } = mongoose;

const modelSchema = new Schema({
    firstName : String,
    lastName: String,
    username: String,
    passwordHash: String
});

module.exports = mongoose.model('user', modelSchema);