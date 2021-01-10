//Require que usa la app
const express = require('express');
const rutas = require('./rutas');
const path = require('path');


//Crear la app 
const app = express();

// Creando Vista Algoritmo
app.set('view engine','pug');
    //Creando la carpeta de la vista
    app.set('views',path.join(__dirname, './vista' ));



//Rutas para la aplicacion web

app.use('/', rutas());






app.listen(3000);
