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

const PORT = 3000;


const mongoConnection = 'mongodb://localhost:27017/usuarios';
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(mongoConnection);
mongoose.connection.on('error',(err)=>{
    throw err;
    process.exit(1);
})

app.use(session({
    secret: 'secret',//???
    resave:true,
    saveUninitialized: true,
    store: new MongoStore({
        mongoUrl: mongoConnection,
        autoReconnect: true
    })
}))


app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res)=>{
    res.send(`Welcome to this page, is listening in PORT: ${PORT}`)
})

//Puerto de escucha
app.listen(PORT,()=>{
    console.log(`listening in PORT: ${PORT}`);
})

app.use(routes);