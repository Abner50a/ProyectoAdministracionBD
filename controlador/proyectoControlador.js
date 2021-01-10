const Actividades = require('../modelo/Actividades');
const slug = require('slug');

exports.activdadesInicio = (req,res) => {
    res.render('index',{
        nombrePagina: 'Inicio'
    });
}

exports.formumlarioActividades = (req,res) => {
    res.render('nuevaActividad', {
        nombrePagina: 'Nueva actividad'
    })
}

exports.nuevoActividad = async (req,res) => {
    //Send.exports
    //console.log(req.body)

    //Valida el formulario
    const { nombre } = req.body;
    
    let error = [];

    if(!nombre) { 
        error.push({'errorTexto': 'Agregar un Nombre a la actividad'});
    }

    if(error.length>0) {
        res.render('nuevaActividad', {
            nombrePagina: 'Nueva actidad',
            error
        }) 
    } else {
        //Insertar datos ya validados
        
        const agregar = await Actividades.create({nombre});
        res.redirect('/')

    }
}
