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
        //console.log(error.errors.map(error => error.message));
        req.flash('error', e.errors.map(e => e.message))
       // console.log(hola)
        res.render('crear-cuenta',{
            Alerta: req.flash() ,
            nombrePagina: 'Crear tu cuenta  - Es gratis',
            email,
            password,
            nombre

        })
    }



 
        ;
 
}