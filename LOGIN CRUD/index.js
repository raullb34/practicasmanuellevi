const express = require('express');
const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const req = require('express/lib/request');
const routes = require('./routes/routes');
const { response } = require('express');
const expressSwagger = require('express-swagger-generator')(app);
const config = require('./config/config.json');
global.config = config;

let options ={
    swaggerDefinition:{
        info:{
            description: 'This is an API login',
            title: 'API login',
        },
        host: 'localhost:3000',
        basePath: '/',
        SecurityDefinitions:{
            JWT:{
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: 'JSON Web Token generator'
            }
        }
    },
    basedir: 'http://localhost:3000/',
    files: ['./routes/routes.js']
};
expressSwagger(options);

// mongoose.connect(config.urlDB, (err, res)=>{
//     if(err) throw err;
//     console.log('Conexión a la base de datos establecida...')
// })

mongoose.connect(config.urlDB);

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


app.get('/', (req, res)=>{
    res.send({message: `Welcome to this page, is listening in PORT: ${config.PORT}`})
})

//Puerto de escucha
app.listen(config.PORT,()=>{
    console.log(`listening in PORT: ${config.PORT}`);
})

app.use(routes);

module.exports = app;