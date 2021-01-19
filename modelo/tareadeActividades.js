const Sequelize = require ('sequelize');
const db = require('../conexionBD/db')
const Actividades = require('./Actividades')



const tareaActividades = db.define('tarea', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tarea: Sequelize.STRING(150),
    disponibilidad: Sequelize.INTEGER(1)
});

//Hacer llave foranea a actividades

tareaActividades.belongsTo(Actividades);

module.exports = tareaActividades;