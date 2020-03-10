require('dotenv').config();

const appEnvironments = {
    PORT_APP: process.env.PORT_APP || 3000
}

module.exports = appEnvironments;