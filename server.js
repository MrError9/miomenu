const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const socketio = require('socket.io');

const router = require('./server/routes/router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
// Middlewares
app.use(cors());
app.use(router);
app.use(passport.initialize());
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//sockets 
require('./server/sockets/customer.socket')(io)
require('./server/sockets/menu.socket')(io)

//routes
require('./server/config/passport')(passport);
require('./server/routes/menu.routes')(app);
require('./server/routes/user.routes')(app);
require('./server/routes/table.routes')(app);
require('./server/routes/manage/customer.routes')(app);


server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));
