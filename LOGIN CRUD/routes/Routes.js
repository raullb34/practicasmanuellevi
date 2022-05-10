const express = require('express');
const bodyParser = require('body-parser');
// const passport = require('passport');
// const passportConfig = require('../config/passport');
const userController = require('../controller/userController');
const depositController = require('../controller/depositController');
const caskController = require('../controller/caskController');
const tankController = require('../controller/tankController');
const auth = require('../middlewares/auth');
const app = express.Router();

const PORT = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//USERS
//registro
app.post('/users', userController.postSignup);
//iniciar sesión
app.post('/login', userController.postLogin);
//borrar usuario
app.delete('/users/:id', auth, userController.deleteUser);
//actualizar usuario
app.patch('/users/:id', auth, userController.updateUser);
//información del usuario
app.get('/users', auth, userController.userInfo);


//DEPOSITS
//Create
app.post('/deposits', auth, depositController.postCreateDeposit);
//delete
app.delete('/deposits/:id', auth, depositController.deleteDeposit);
//update
app.patch('/deposits/:id', auth, depositController.updateDeposit);
//read
app.get('/deposits/:id', auth, depositController.readDeposit);
//read all deposits
app.get('/alldeposits', auth, depositController.readAllDeposits);


//CASKS
//Create
app.post('/casks', auth, caskController.postCreateCask);
//delete
app.delete('/casks/:id', auth, caskController.deleteCask);
//update
app.patch('/casks/:id', auth, caskController.updateCask);
//read
app.get('/casks/:id', auth, caskController.readCask);
//read all casks
app.get('/allcasks', auth, caskController.readAllCasks);


//TANKS
//Create
app.post('/tanks', auth, tankController.postCreateTank);
//delete
app.delete('/tanks/:id', auth, tankController.deleteTank);
//update
app.patch('/tanks/:id', auth, tankController.updateTank);
//read
app.get('/tanks/:id', auth, tankController.readTank);
//read all tanks
app.get('/alltanks', auth, tankController.readAllTanks);

module.exports = app;