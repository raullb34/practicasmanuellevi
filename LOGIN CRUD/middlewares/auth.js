'use strict'

const { response } = require('..');
const services = require('../services/services');;
function isAuth (req, res, next){
    if(!req.headers.authorization){
        return res.status(401).send({message: 'You have to log in to access resources'})
    }

    const token = req.headers.authorization.split(" ")[1];
    
    services.decodeToken(token)
    .then(response=>{
        req.user = response;
        next();
    })
    .catch(response=>{
        res.status(response.status)
    })
}

module.exports = isAuth