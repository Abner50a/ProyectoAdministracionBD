const Sequelize = require('sequelize');
const shortid = require('shortid');
const slug = require('slug');

const db = require('../conexionBD/db');

const Actividades = db.define('actividades', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: Sequelize.STRING(100),
    idActividades: Sequelize.STRING(100)
    
},
{
    hooks: {
        beforeCreate(actividades){
            const idActividades = slug(actividades.nombre).toLowerCase();
            
            //actividades.idActividades = idActividades;
            actividades.idActividades =  `${idActividades}-${shortid.generate()}`
        }

        // beforeUpdate(actividades){
        //     const idActividades = slug(actividades.nombre).toLowerCase();
            
        //     //actividades.idActividades = idActividades;
        //     actividades.idActividades =  `${idActividades}-${shortid.generate()}`
        // },

    }
}
)



module.exports =  Actividades;