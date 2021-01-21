const misUsuario = require('../modelo/usuariosModelo');

exports.loginForm = (req,res,next) => {
  //  const { enviarError } = res.locals.Alerta;
   // console.log(err)
  // console.log(enviarError) 
  const {error} =  res.locals.Alerta
   res.render('login',{
        nombrePagina: 'Logea Tu cuenta  - Es gratis',
        error
    })
}