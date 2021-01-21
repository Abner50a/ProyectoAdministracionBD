//Require que usa la app
const express = require('express');
const rutas = require('./rutas');
const path = require('path');
const bodyParse = require('body-parser');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./conexionBD/pass');

const flash = require('connect-flash');

//codigos extras
const codigos = require('./codigos')

//Se conecta ala BD

const db = require('./conexionBD/db');

    //crear tabla
require('./modelo/Actividades')
require('./modelo/tareadeActividades')
require('./modelo/usuariosModelo')


db.sync()
    .then(() => console.log('On'))
    .catch((error) => console.log(error));

//Crear la app 
const app = express();

//Archivos staticos
app.use(express.static('public'));

//Validar formulario y pasar
app.use(bodyParse.urlencoded({extended: true}));

//app.use(expresValidator());



// Creando Vista Algoritmo
app.set('view engine','pug');
    //Acciendo a la carpeta de la vista
    app.set('views',path.join(__dirname, './vista' ));

app.use(flash());

app.use(cookieParser());

//Hablo AUTH en el app
app.use(expressSession({
    secret: 'ujat123',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

 //Pasar codigo
 app.use((req,res,next)=>{
        //console.log(req.user)
        res.locals.ArregloLimpiado = codigos.regresarObjecto;
        res.locals.Alerta = req.flash();
        res.locals.enviarUsuario = {...req.user} || null
        
        next();
 }); 




//Rutas para la aplicacion web

app.use('/', rutas());





app.listen(3000);
