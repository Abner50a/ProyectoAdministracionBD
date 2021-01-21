const express = require('express');
const router = express.Router()

const { body } = require('express-validator/check');


//Ruta del inicio
const actividadControlador = require('../controlador/actividadControlador');
const tareaControlador = require('../controlador/tareaControlador');
const usuarioConrolador = require('../controlador/crearCuentaControlador');
const loginControlador = require('../controlador/loginControler');
const loginValidacion = require('../controlador/loginValidacionController');
// const tareaActividades = require('../modelo/tareadeActividades');

module.exports = function () {

    router.get('/', 
    loginValidacion.usuarioVerificadoDisponible,
    actividadControlador.activdadesInicio);

    router.get('/nueva-actividad',
    loginValidacion.usuarioVerificadoDisponible,
    actividadControlador.formumlarioActividades )
    
    router.post('/nueva-actividad/',
    loginValidacion.usuarioVerificadoDisponible,
    body('nombre').not().isEmpty().trim().escape(),    
    actividadControlador.nuevoActividad );

    //Mostrar actividades
    router.get('/actividades/:url',
    loginValidacion.usuarioVerificadoDisponible,
    actividadControlador.actividadesURL)
    

    //Actualiza actividades
    router.get('/actividades/edita/:id', loginValidacion.usuarioVerificadoDisponible,
    actividadControlador.actividadesEditarForm)

    router.post('/nueva-actividad/:id', loginValidacion.usuarioVerificadoDisponible, 
    body('nombre').not().isEmpty().trim().escape(),    
    actividadControlador.actualizaActividad );


    //sentEliminar
    router.delete('/actividades/:id', loginValidacion.usuarioVerificadoDisponible,
    actividadControlador.eliminarActividades )
  


    ///Formn Tarea
    router.post('/actividades/:id', loginValidacion.usuarioVerificadoDisponible,
    tareaControlador.agregandoTarea);

        //FormuActualizar Tarea cambai un solo elemento
    router.patch('/misTareas/:id',loginValidacion.usuarioVerificadoDisponible,
    tareaControlador.cambiaTareaForm);    

        //FormuEliminar Tarea 
    router.delete('/misTareas/:id',loginValidacion.usuarioVerificadoDisponible,
    tareaControlador.eliminarTareaForm); 
    
    
    ///////////////////////////SISTEMA DE USUARIOS ///////////////////

    ////Crea nueva cuenta.

    router.get('/crea-cuenta', usuarioConrolador.crearCuentaForm);

    router.post('/crea-cuenta', usuarioConrolador.crearCuentaFormEnviar);



    //////////Login
    router.get('/login', loginControlador.loginForm );
    router.post('/login', loginValidacion.validarUsuario);

    router.get('/salir', loginValidacion.salirCuenta );
    return router;
}




