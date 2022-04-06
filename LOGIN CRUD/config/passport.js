const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/user');

passport.serializeUser((user, done)=>{
    done(null, user._id);
})

passport.deserializeUser((id, done)=>{
    User.findById(id, (err, user)=>{
        done(err, user);
    })
})

passport.use(new LocalStrategy(
    {usernameField: 'username'},(username, password, done)=>{
        User.findOne({username}, (err, user)=>{
            if(!user){
                return done(null, false, {message: `This username: ${username}, does not registered`});
            }else{
                user.passwordCompare(password, (err, areEquals)=>{
                   if(areEquals){
                       return done(null, user);;
                   } else{
                       return done(null, false, {message: 'Pasword is not valid'});
                   }
                })
            }
        })
    }
))


exports.isAuth = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    res.status(400).send(`You have to log in to access resources`);
}