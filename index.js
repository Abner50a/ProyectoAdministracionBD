//Require que usa la app
const express = require('express');
const rutas = require('./rutas');
const path = require('path');
const bodyParse = require('body-parser');

const alertas = require('connect-flash');

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

//Validar formulario y pasar
app.use(bodyParse.urlencoded({extended: true}));

//app.use(expresValidator());

//Archivos staticos
app.use(express.static('public'));

// Creando Vista Algoritmo
app.set('view engine','pug');
    //Acciendo a la carpeta de la vista
    app.set('views',path.join(__dirname, './vista' ));

app.use(alertas());

 //Pasar codigo
 app.use((req,res,next)=>{
        res.locals.ArregloLimpiado = codigos.regresarObjecto;
        next();
 }); 




//Rutas para la aplicacion web

app.use('/', rutas());





app.listen(3000);
