const { response } = require('express');
const User = require('../model/user');
const bcrypt = require('bcrypt-nodejs');
const req = require('express/lib/request');
const service = require('../services/services');
const mongoose = require('mongoose');

//crear usuario
exports.postSignup = (req, res)=>{
    const newUser = new User({
        username: req.body.username,
        password: req.body.password
    });

    newUser.save((err)=>{
        if(err) return res.status(500).send({message:`Error al crear el usuario: ${err}`})
        
        return res.status(200).send({token: service.createToken(newUser)})
    })
}

//iniciar sesión
exports.postLogin = (req, res)=>{
 
    User.findOne({username: req.body.username},(err, user)=>{
        if(err) return res.status(500).send({message: err})
        if(!user) return res.status(404).send({message: 'username or password does not valids'})
        console.log(user);

        req.user = user
        res.status(200).send({
            message: 'Login correct',
            token: service.createToken(user)
        })
    })

}


//Eliminar usuario
exports.deleteUser = (req, res, next)=>{
    const userID = req.params.id;
    User.findByIdAndRemove(userID, (err)=>{
        if(err){
            return next(err);
        }
    })
    res.send({message: 'User removed succesfully'});
}

//Actualizar usuario
exports.updateUser = (req, res, next)=>{
    const userID = req.params.id;
    var newUsername=req.body.username;
    var newPassword=req.body.password;

    //find user with params.id
    User.findOne({_id: userID}, (err, existingUser)=>{
        if(!existingUser){
            return res.status(400).send({message: 'User to modify inexistent'})
        }
        //find user with newUsername
        if(!newUsername==''){
            User.updateOne({_id: userID},{username:newUsername}, (err)=>{
                if(err){
                    //next(err);
                    return res.status(400);
                }
            })
        }
            
        if(!newPassword == ''){
            bcrypt.genSalt(10, (err, salt)=>{
                if(err){
                    next(err);
                }
                bcrypt.hash(newPassword, salt, null, (err, hash)=>{
                    if(err){
                        next(err);
                    }
                    newPassword=hash;
                    User.updateOne({_id: userID},{password:newPassword}, (err)=>{
                        if(err){
                            return next(err);
                        }
                    })
                    next();
                })
            })
        }
        res.send({message: `User updated succesfully`});  
    })    
}

//ver info de usuario
exports.userInfo = (req, res)=>{
    res.send({
        message: req.user
    })
}