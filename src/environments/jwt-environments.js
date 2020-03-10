require('dotenv').config();

const environments = {
    JWT_SECRET: process.env.JWT_SECRET || 'primo-world'
}

module.exports = environments;