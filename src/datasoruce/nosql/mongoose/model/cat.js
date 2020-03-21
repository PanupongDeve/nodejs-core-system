const mongoose = require('mongoose');
const { Schema } = mongoose;

const modelSchema = new Schema({
    name : String,
    age: Number,
    owner: String,
    status: String
    
    
});

module.exports = mongoose.model('cat', modelSchema);