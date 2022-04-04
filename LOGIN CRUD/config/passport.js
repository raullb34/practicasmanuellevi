const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuario = require('../modelo/Usuario');

passport.serializeUser((usuario, done)=>{
    done(null, usuario._id);
})

passport.deserializeUser((id, done)=>{
    Usuario.findById(id, (err, usuario)=>{
        done(err, usuario);
    })
})

passport.use(new LocalStrategy(
    {usernameField: 'username'},(username, password, done)=>{
        Usuario.findOne({username}, (err, usuario)=>{
            if(!usuario){
                return done(null, false, {message: `Este username: ${username}, no esta resgitrado`});
            }else{
                usuario.compararPassword(password, (err, sonIguales)=>{
                   if(sonIguales){
                       return done(null, usuario);;
                   } else{
                       return done(null, false, {message: 'La contraseña no es válida'});
                   }
                })
            }
        })
    }
))


exports.estaAutenticado = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    }

    res.status(400).send(`tienes que loguearte para acceder a los recursos`);
}