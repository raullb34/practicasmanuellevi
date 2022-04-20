const express = require('express');
const bodyParser = require('body-parser');
// const passport = require('passport');
// const passportConfig = require('../config/passport');
const userController = require('../controller/user');
const depositController = require('../controller/deposit');
const caskController = require('../controller/cask');
const tankController = require('../controller/tank');
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
app.post('/deposits', depositController.postCreateDeposit);
//delete
app.delete('/deposits/:id', depositController.deleteDeposit);
//update
app.patch('/deposits/:id', depositController.updateDeposit);
//read
app.get('/deposits/:id', depositController.readDeposit);
//read all deposits
app.get('/alldeposits', depositController.readAllDeposits);


//CASKS
//Create
app.post('/casks', caskController.postCreateCask);
//delete
app.delete('/casks/:id', caskController.deleteCask);
//update
app.patch('/casks/:id', caskController.updateCask);
//read
app.get('/casks/:id', caskController.readCask);
//read all casks
app.get('/allcasks', caskController.readAllCasks);


//TANKS
//Create
app.post('/tanks', tankController.postCreateTank);
//delete
app.delete('/tanks/:id', tankController.deleteTank);
//update
app.patch('/tanks/:id', tankController.updateTank);
//read
app.get('/tanks/:id', tankController.readTank);
//read all tanks
app.get('/alltanks', tankController.readAllTanks);

module.exports = app;