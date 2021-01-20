const misUsuario = require('../modelo/usuariosModelo');
const miUsuario = require('../modelo/usuariosModelo');

exports.crearCuentaForm = (req,res,next) => {
    res.render('crear-cuenta',{
        nombrePagina: 'Crear tu cuenta  - Es gratis'
    })
}

exports.crearCuentaFormEnviar =  async (req,res,next) => {

    //getDates
   // console.log(req.body)

   const {email, password, nombre} = req.body
    //sent Datos insert into ...

    try{
            /// INSERT INTO `usuarios` (`uid`,`email`,`nombre`,`password`) VALUES (DEFAULT,?,?,?);
        await  misUsuario.create({
            email,
            password,
            nombre
        })
    res.redirect('/login') 
    }   catch(e) {
        res.render('crear-cuenta',{
            errorEnviar: e.errors,
            nombrePagina: 'Crear tu cuenta  - Es gratis'
        })
    }



 
        ;
 
}