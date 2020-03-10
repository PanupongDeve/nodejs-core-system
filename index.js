const app = require('./src/app');
const { PORT_APP} = require('./src/environments/app');

app.listen(PORT_APP, () => {
    console.log('server running port ' + PORT_APP);
})
