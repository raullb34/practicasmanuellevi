const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username:{type: String, required: true, unique:true},
    password:{type: String, required: true}
})

userSchema.pre('save', function(next){
    const user = this;
    
    bcrypt.genSalt(10, (err, salt)=>{
        if(err){
            next(err);
        }
        bcrypt.hash(user.password, salt, null, (err, hash)=>{
            if(err){
                next(err)
            }
            user.password = hash;
            next();
        })
    })
})

userSchema.methods.passwordCompare = function(password, cb){
    bcrypt.compare(password, this.password,(err, areEquals)=>{
        if(err){
            return cb(err);
        }
        cb(null, areEquals);
    })
}

module.exports = mongoose.model('User', userSchema);