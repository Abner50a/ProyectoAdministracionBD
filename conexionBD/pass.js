const passport = require('passport');
const localPass = require('passport-local').Strategy;

const Usuario = require('../modelo/usuariosModelo');


//set Local a cliente ... getDB (usuario y pass)
passport.use(
    new localPass(
        ///Enviamos query a la tabla para poder recibir la verificacion
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email,password, callback) => {
            try {
                const usuario = await Usuario.findOne({
                    where: {
                        email
                    }
                    
                });

                //Usuario existe pero password no => validar para que encuentre el usuario
                    if(!usuario.checkPass(password)){
                        return callback(null, false, {
                            message: 'Password incorrecto'
                        })

                    }

                    return callback(null,usuario); //usuario tendra los datos get revisar con console.log(usuario)
            } catch (error) {
                //No pasa la validacion o no existe el usuario
                return callback(null, false, {
                    message: 'La cuenta no existe'
                })
            }
        }
    )
)

//Encriptar para haceder los valores
passport.serializeUser((usuario,callback) => {
    callback(null,usuario)
})

//Descriptar

passport.deserializeUser((usuario,callback)=>{
    callback(null,usuario);
})

module.exports = passport;