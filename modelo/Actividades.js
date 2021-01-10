const Sequelize = require('sequelize');

const db = require('../conexionBD/db');

const Actividades = db.define('actividades', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: Sequelize.STRING,
    idActividades: Sequelize.STRING
    
})

module.exports =  Actividades;