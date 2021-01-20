const express = require('express');
const router = express.Router()

const { body } = require('express-validator/check');


//Ruta del inicio
const proyectoControlador = require('../controlador/proyectoControlador');
const tareaControlador = require('../controlador/tareaControlador');

// const tareaActividades = require('../modelo/tareadeActividades');

module.exports = function () {

    router.get('/', proyectoControlador.activdadesInicio);
    router.get('/nueva-actividad',proyectoControlador.formumlarioActividades )
    router.post('/nueva-actividad/', 
    body('nombre').not().isEmpty().trim().escape(),    
    proyectoControlador.nuevoActividad );

    //Mostrar actividades
    router.get('/actividades/:url',proyectoControlador.actividadesURL)
    

    //Actualiza actividades
    router.get('/actividades/edita/:id',proyectoControlador.actividadesEditarForm)
    router.post('/nueva-actividad/:id', 
    body('nombre').not().isEmpty().trim().escape(),    
    proyectoControlador.actualizaActividad );


    //sentEliminar
    router.delete('/actividades/:id', proyectoControlador.eliminarActividades )
  


    ///Formn Tarea
    router.post('/actividades/:id', tareaControlador.agregandoTarea);

        //FormuActualizar Tarea cambai un solo elemento
    router.patch('/misTareas/:id',tareaControlador.cambiaTareaForm);    

        //FormuEliminar Tarea 
    router.delete('/misTareas/:id',tareaControlador.eliminarTareaForm);    

    return router;
}




