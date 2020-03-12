const app = require('./src/app');
const { PORT_APP} = require('./src/environments/app');
const sequelize = require('./src/datasoruce/mysql/mariadb');
require('./src/datasoruce/mysql/mariadb/register');




app.listen(PORT_APP, () => {
    console.log('server running port ' + PORT_APP);
})
