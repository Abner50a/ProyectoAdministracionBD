const express = require('express');
const router = express.Router()

const { body } = require('express-validator/check');


//Ruta del inicio
const proyectoControlador = require('../controlador/proyectoControlador');

module.exports = function () {

    router.get('/', proyectoControlador.activdadesInicio);
    router.get('/nueva-actividad',proyectoControlador.formumlarioActividades )
    router.post('/nueva-actividad/', 
    body('nombre').not().isEmpty().trim().escape(),    
    proyectoControlador.nuevoActividad );

    //Mostrar actividades
    router.get('/actividades/:id',proyectoControlador.actividadesURL)
    

    //Actualiza actividades
    router.get('/actividades/edita/:id',proyectoControlador.actividadesEditarForm)
    router.post('/nueva-actividad/:id', 
    body('nombre').not().isEmpty().trim().escape(),    
    proyectoControlador.actualizaActividad );


    return router;
}




