const http = require('http');
const app = require('./app');
const server = http.createServer(app);





app.listen(8080, () => {
    console.log('connected')
});
