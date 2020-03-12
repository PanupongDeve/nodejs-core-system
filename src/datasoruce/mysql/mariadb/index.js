const Sequelize = require('sequelize');
const {
    DB_ENDPOINT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
    DB_TIMEZONE
} = require('../../../environments/mariadb-environments');

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_ENDPOINT,
    dialect: 'mariadb', /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    timezone: DB_TIMEZONE
});

sequelize.sync();

module.exports = sequelize;