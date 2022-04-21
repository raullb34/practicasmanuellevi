const { response } = require('express');
const User = require('../model/user');
const bcrypt = require('bcrypt-nodejs');
const req = require('express/lib/request');
const service = require('../services/services');
const mongoose = require('mongoose');

//crear usuario
/**
 * 
 * @route POST /users
 * @function create a new user
 * @param {string} username.query.required - username - eg:username 
 * @param {string} password.query.required - password - eg:password
 * @returns {object} 200 - A Array of user info
 * @returns {error} 409 - A message about the error
 *  
 */
exports.postSignup = (req, res)=>{
    const newUser = new User({
        username: req.body.username,
        password: req.body.password
    });

    newUser.save((err)=>{
        if(err) return res.status(409).send({message:`username already registered: ${err}`})
        
        return res.status(200).send({token: service.createToken(newUser)})
    })
}

//iniciar sesión
/**
 * 
 * @route POST /login
 * @function logIn with an user
 * @param {string} username.query.required - username - eg:username 
 * @param {string} password.query.required - password - eg:password
 * @returns {object} 200 - A Array of user info and a message of confirmation
 * @returns {error} 500 - A message about the error
 * @returns {error} 404 - A message about the error
 *  
 */
exports.postLogin = (req, res)=>{
 
    User.findOne({username: req.body.username},(err, user)=>{
        if(err) return res.status(500).send({message: err})
        if(!user) return res.status(404).send({message: 'username or password does not valids'})

        var validPassword = bcrypt.compare(req.body.password, user.password, (err, eq)=>{
            if(err){
                return err;
            }
            if(eq){
                req.user = user
                res.status(200).send({
                    message: 'Login correct',
                    token: service.createToken(user)
                })
            }else{
                return res.status(404).send({message: 'username or password does not valids'})
            }
        })
    })

}


//Eliminar usuario
/**
 * 
 * @route DELETE /users/:id
 * @function remove an user
 * @param {:id} id.query.required
 * @returns {object} 200 - A message of confirmation
 * @returns {error} default - Unexpected error
 *  
 */
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
/**
 * 
 * @route PATCH /users/:id
 * @function update an user
 * @param {string} username.query.required - username - eg:username 
 * @param {string} password.query.required - password - eg:password
 * @param {:id} id.query.required
 * @returns {object} 200 - A message of confirmation
 * @returns {error} 404 - A message about error
 *  
 */
exports.updateUser = (req, res, next)=>{
    const userID = req.params.id;
    var newUsername=req.body.username;
    var newPassword=req.body.password;

    //find user with params.id
    User.findOne({_id: userID}, (err, existingUser)=>{
        if(!existingUser){
            return res.status(404).send({message: 'User to modify inexistent'})
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
/**
 * 
 * @route GET /users
 * @function show info about user
 * @param {:id} id.query.required
 * @returns {object} 200 - A message with user info
 *  
 */
exports.userInfo = (req, res)=>{
    res.send({
        message: req.user
    })
}