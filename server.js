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

//enable dotnev in order to use the env variables
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
//sockets 
require('./server/sockets/customer.socket')(io)
require('./server/sockets/menu.socket')(io)

//routes
require('./server/config/passport')(passport);
require('./server/routes/menu.routes')(app);
require('./server/routes/user.routes')(app);
require('./server/routes/table.routes')(app);
require('./server/routes/manage/customer.routes')(app);
// uploads/products
// getting the product image
// public
app.get('/server/uploads/:dest/:file',(req,res) =>{
    const {file, dest} =req.params;
    const targetFile = (`./uploads/${dest}/${file}`);

    if((targetFile).length>0){
        res.sendFile(`./uploads/${dest}/${file}`, {
            "root": __dirname
        })
    }else {
      res.status(404).send({
        message : "file not found"
      })
    }
   
})


server.listen(process.env.PORT || 5005, () => console.log(`Server has started.`));
