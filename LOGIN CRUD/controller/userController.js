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

 exports.postSignup = async (req, res)=>{
    const newUser = new User({
        username: req.body.username,
        password: req.body.password
    });

    let success = await newUser.save().catch((err)=>{
        console.error("\nError: " + err)
        return {error: err}
    });

    if(success){
        if(!success.error){
            return res.status(200).send({token: service.createToken(newUser)})
        }else if(success.error){
            return res.status(409).send({
                message: "Error: " + success.error 
            });
        }
    }
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


 exports.postLogin = async (req, res)=>{ 
    let success = await User.findOne({username: req.body.username}).catch((err)=>{
        console.error("\nError: " + err)
        return {error: err}
    })

    if(success){
        if(!success.error){
            var validPassword = bcrypt.compare(req.body.password, success.password, (err, eq)=>{
                if(err){
                    return err;
                }
                if(eq){
                    req.user = success
                    res.status(200).send({
                        message: 'Login correct',
                        token: service.createToken(success)
                    })
                }else{
                    return res.status(404).send({message: 'username or password does not valids'})
                }
            })
        }else if(success.error){
            return res.status(404).send({
                message: "Error: " + success.error 
            });
        }
    }else{
        return res.status(400).json({message: 'username or password does not valids'});
    }
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
exports.deleteUser = async (req, res)=>{
    const userID = req.params.id;
    let success = User.findByIdAndRemove(userID).catch((err)=>{
        console.error("\nError: " + err)
        return { error: err }
    });

    if(success){
        if(!success.error){
            return res.send({message: 'User removed succesfully'});
        }else if(success.error){
            return res.status(400).json({ message: "Error: " + success.error });
        }
    }else{
        return res.status(400).json({ message: "Error: " + success.error });
    }
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

 exports.updateUser = async (req, res, next)=>{
    const userID = req.params.id;
    var newUsername=req.body.username;
    var newPassword=req.body.password;

    //find user with params.id
    let success = User.findOne({_id: userID}).catch((err)=>{
        console.error("\nError: " + err)
        return { error: err }
    });

    if(success){
        if(!success.error){
            if(!newUsername==''){
                let updateUsername = User.updateOne({_id: userID},{username:newUsername}).catch((err)=>{
                    console.error("\nError: " + err)
                    return { error: err }
                })
                if(updateUsername){
                    if(updateUsername.error){
                        return res.status(400).json({ message: "Error: " + success.error });
                    }
                }
                
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
        }else if(success.error){
            return res.status(404).send({message: 'User to modify inexistent'})
        }
    }else{
        return res.status(400).json({ message: "Error: " + success.error });
    }
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