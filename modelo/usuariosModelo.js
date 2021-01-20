const Sequelize = require('sequelize');
const encrip = require('bcrypt-nodejs');
const db = require('../conexionBD/db');
const Actividades = require('../modelo/Actividades')
const misUsuario = db.define('usuarios', {
    uid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'Agregar Correo valido'
            },
            notEmpty: {
                msg: 'El correo no debe ir vacio'
            }
        },
        unique: {
            args: true,
            msg: 'Usuario existe en la BD'
        }
    },
    nombre: {
        type: Sequelize.STRING(60),
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Password no debe ir vacio'
            }
        }
    }
}, {
    hooks: {
        beforeCreate(misUsuario){
            misUsuario.password = encrip.hashSync(misUsuario.password, encrip.genSaltSync(10));
        }
    }
});

misUsuario.hasMany(Actividades);

module.exports = misUsuario;