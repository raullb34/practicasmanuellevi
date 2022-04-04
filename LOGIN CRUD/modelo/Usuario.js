const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const usuarioSchema = new Schema({
    username:{type: String, required: true, unique:true},
    password:{type: String, required: true}
})

usuarioSchema.pre('save', function(next){
    const usuario = this;
    
    bcrypt.genSalt(10, (err, salt)=>{
        if(err){
            next(err);
        }
        bcrypt.hash(usuario.password, salt, null, (err, hash)=>{
            if(err){
                next(err)
            }
            usuario.password = hash;
            next();
        })
    })
})

usuarioSchema.methods.compararPassword = function(password, cb){
    bcrypt.compare(password, this.password,(err, sonIguales)=>{
        if(err){
            return cb(err);
        }
        cb(null, sonIguales);
    })
}

module.exports = mongoose.model('Usuario', usuarioSchema);