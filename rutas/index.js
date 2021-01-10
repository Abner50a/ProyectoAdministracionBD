const express = require('express');
const router = express.Router()

//Ruta del inicio
const proyectoControlador = require('../controlador/proyectoControlador');

module.exports = function () {

    router.get('/', proyectoControlador.activdadesInicio);


    return router;
}



