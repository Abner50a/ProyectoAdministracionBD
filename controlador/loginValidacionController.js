const passport = require('passport')




//Protegiendo el sitio web
exports.usuarioVerificadoDisponible = (req,res,next) => {
        //Verifica si el usuario existe en la BD
    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/login');


    ///Si no tiene cuenta, sacarlo
}


///Valida al usuario

exports.validarUsuario = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
    badRequestMessage: 'Usuario y password vacios'
} )


//Salir d ela cuenta
 
exports.salirCuenta = (req,res,next) => {
    req.session.destroy(()=>{
        res.redirect('/login')
    })
}