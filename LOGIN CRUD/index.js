const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportConfig = require('./config/passport');

const PORT = 3000;
const mongoConexion = 'mongodb://localhost:27017/usuarios';
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(mongoConexion);
mongoose.connection.on('error',(err)=>{
    throw err;
    process.exit(1);
})

app.use(session({
    secret: 'secret',//???
    resave:true,
    saveUninitialized: true,
    store: new MongoStore({
        mongoUrl: mongoConexion,
        autoReconnect: true
    })
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res)=>{
    res.send(`Bienvenido a esta página, se escucha en el puerto: ${PORT}`)
})

const controladorUsuario = require('./controlador/usuario');
const req = require('express/lib/request');

//RUTAS DE USUARIOS
//registro
app.post('/signup', controladorUsuario.postSignup);
//iniciar sesión
app.post('/login', controladorUsuario.postLogin);
//cerrar sesión
app.get('/logout', passportConfig.estaAutenticado, controladorUsuario.logout);
//borrar usuario
app.delete('/deleteUser/:id', passportConfig.estaAutenticado, controladorUsuario.deleteUser);
//actualizar usuario
app.patch('/updateUser/:id', passportConfig.estaAutenticado, controladorUsuario.updateUser);
//información del usuario
app.get('/userInfo', passportConfig.estaAutenticado, (req, res)=>{
    res.json(req.user);
})


//DEPOSIT ROUTES
const depositController = require('./controlador/deposit');
//Create
app.post('/createDeposit', depositController.postCreateDeposit);
//delete
app.delete('/deleteDeposit/:id', depositController.deleteDeposit);
//update
app.patch('/updateDeposit/:id', depositController.updateDeposit);
//read
app.get('/depositInfo/:id', depositController.readDeposit);

//CASK ROUTES
const caskController = require('./controlador/cask');
//Create
app.post('/createCask', caskController.postCreateCask);
//delete
app.delete('/deleteCask/:id', caskController.deleteCask);
//update
app.patch('/updateCask/:id', caskController.updateCask);
//read
app.get('/caskInfo/:id', caskController.readCask);

//TANK ROUTES
const tankController = require('./controlador/tank');
//Create
app.post('/createTank', tankController.postCreateTank);
//delete
app.delete('/deleteTank/:id', tankController.deleteTank);
//update
app.patch('/updateTank/:id', tankController.updateTank);
//read
app.get('/tankInfo/:id', tankController.readTank);


//Puerto de escucha
app.listen(PORT,()=>{
    console.log(`Escuchando en el puerto ${PORT}`);
})