const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportConfig = require('./config/passport');
const req = require('express/lib/request');
const routes = require('./routes/routes');
const { response } = require('express');
const { initialize } = require('passport/lib');
const config = require('./config/config.json');
global.config = config;



const app = express();



mongoose.connect(config.urlDB);
module.exports = mongoose;

mongoose.Promise = global.Promise;
mongoose.connection.on('error',(err)=>{
    throw err;
    process.exit(1);
})

app.use(session({
    secret: 'secret',//???
    resave:true,
    saveUninitialized: true,
    store: new MongoStore({
        mongoUrl: config.urlDB,
        autoReconnect: true
    })
}))


app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res)=>{
    res.send({message: `Welcome to this page, is listening in PORT: ${config.PORT}`})
})

//Puerto de escucha
app.listen(config.PORT,()=>{
    console.log(`listening in PORT: ${config.PORT}`);
})

app.use(routes);

module.exports = app;