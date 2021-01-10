//Require que usa la app
const express = require('express');
const rutas = require('./rutas');


//Crear la app 
const app = express();

//Rutas para la aplicacion web

app.use('/', rutas());






app.listen(3000);
