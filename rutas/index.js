const express = require('express');
const router = express.Router()

//Ruta del inicio
const proyectoControlador = require('../controlador/proyectoControlador');

module.exports = function () {

    router.get('/', proyectoControlador.activdadesInicio);
    router.get('/nueva-actividad',proyectoControlador.formumlarioActividades )
    router.post('/nueva-actividad', proyectoControlador.nuevoActividad )
    
    return router;
}




