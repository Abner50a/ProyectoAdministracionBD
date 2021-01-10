const Sequelize = require('sequelize');
const slug = require('slug');

const db = require('../conexionBD/db');

const Actividades = db.define('actividades', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: Sequelize.STRING,
    idActividades: Sequelize.STRING
    
},
{
    hooks: {
        beforeCreate(actividades){
            const idActividades = slug(actividades.nombre).toLowerCase();
            actividades.idActividades = idActividades;
        }
    }
}
)

module.exports =  Actividades;