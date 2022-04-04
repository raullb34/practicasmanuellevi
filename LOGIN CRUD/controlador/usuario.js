const { response } = require('express');
const passport = require('passport');
const Usuario = require('../modelo/Usuario');
const bcrypt = require('bcrypt-nodejs');
const req = require('express/lib/request');
const mongoose = require('mongoose');

//crear usuario
exports.postSignup = (req, res, next)=>{
    const nuevoUsuario = new Usuario({
        username: req.body.username,
        password: req.body.password
    });

    Usuario.findOne({username: req.body.username}, (err, usuarioExistente)=>{
        if(usuarioExistente){
            return res.status(400).send('username ya registrado')
        }
        nuevoUsuario.save((err)=>{
            if(err){
                next(err);
            }
            req.logIn(nuevoUsuario, (err)=>{
                if(err){
                    next(err);
                }
                res.send('Usuario creado');
            })
        })
    })
}

//iniciar sesión
exports.postLogin = (req, res, next)=>{
    passport.authenticate('local', (err, usuario, info)=>{
        if(err){
            next(err);
        }
        if(!usuario){
            return res.status(400).send('usuario o contraseña no válidos');
        }
        req.logIn(usuario, (err)=>{
            if(err){
                next(err);
            }
            res.send('Login correcto')
        })
    })(req, res, next);
}

//cerrar sesión
exports.logout = (req, res)=>{
    req.logout();
    res.send('logout correcto');
}

//Eliminar usuario
exports.deleteUser = (req, res, next)=>{
    const userID = req.params.id;
    Usuario.findByIdAndRemove(userID, (err)=>{
        if(err){
            return next(err);
        }
    })
    res.send('Borrado correcto');
}

//Actualizar usuario
exports.updateUser = (req, res, next)=>{
    const userID = req.params.id;
    var newUsername=req.body.newUsername;
    var newPassword=req.body.newPassword;

    //find user with params.id
    Usuario.findOne({_id: userID}, (err, usuarioExistente)=>{
        if(!usuarioExistente){
            return res.status(400).send('usuario a modificar inexistente')
        }
        //find user with newUsername
        Usuario.findOne({username: req.body.newUsername}, (err, usernameExistente)=>{
            if(usernameExistente){
                return res.status(400).send('username ya registrado')
            }
            if(!newUsername==''){
                Usuario.updateOne({_id: userID},{username:newUsername}, (err)=>{
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
                        Usuario.updateOne({_id: userID},{password:newPassword}, (err)=>{
                            if(err){
                                return next(err);
                            }
                        })
                        next();
                    })
                })
            }
            res.send(`Usuario actualizado correctamente`);
        })  
    })    
}