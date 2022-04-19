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
app.post('/signup', userController.postSignup);
//iniciar sesión
app.post('/login', userController.postLogin);
//borrar usuario
app.delete('/deleteUser/:id', auth, userController.deleteUser);
//actualizar usuario
app.patch('/updateUser/:id', auth, userController.updateUser);
//información del usuario
app.get('/userInfo', auth, (req, res)=>{
    res.send({message: req.user});
})


//DEPOSITS
//Create
app.post('/createDeposit', depositController.postCreateDeposit);
//delete
app.delete('/deleteDeposit/:id', depositController.deleteDeposit);
//update
app.patch('/updateDeposit/:id', depositController.updateDeposit);
//read
app.get('/depositInfo/:id', depositController.readDeposit);
//read all deposits
app.get('/allDepositsInfo', depositController.readAllDeposits);


//CASKS
//Create
app.post('/createCask', caskController.postCreateCask);
//delete
app.delete('/deleteCask/:id', caskController.deleteCask);
//update
app.patch('/updateCask/:id', caskController.updateCask);
//read
app.get('/caskInfo/:id', caskController.readCask);
//read all casks
app.get('/allCasksInfo', caskController.readAllCasks);


//TANKS
//Create
app.post('/createTank', tankController.postCreateTank);
//delete
app.delete('/deleteTank/:id', tankController.deleteTank);
//update
app.patch('/updateTank/:id', tankController.updateTank);
//read
app.get('/tankInfo/:id', tankController.readTank);
//read all tanks
app.get('/allTanksInfo', tankController.readAllTanks);

module.exports = app;