const Actividades = require('../modelo/Actividades');
const slug = require('slug');

exports.activdadesInicio =async (req,res) => {
    //Buscamos las actividades hacermos consultas
    
    const pasarActividades = await Actividades.findAll();  //Equivale a SELECT * FROM actividades


    res.render('index',{
        nombrePagina: 'Inicio',
        pasarActividades
    });
}

exports.formumlarioActividades = async (req,res) => {
    const pasarActividades = await Actividades.findAll();  //Equivale a SELECT * FROM actividades

    res.render('nuevaActividad', {
        nombrePagina: 'Nueva actividad',
        pasarActividades
    })
}

exports.nuevoActividad = async (req,res) => {
      const pasarActividades = await Actividades.findAll();  //Equivale a SELECT * FROM actividades
  
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
            error,
            pasarActividades
        }) 
    } else {
        //Insertar datos ya validados
        
      await Actividades.create({nombre});
        res.redirect('/')

    }
}


exports.actualizaActividad = async (req,res) => {
    const pasarActividades = await Actividades.findAll();  //Equivale a SELECT * FROM actividades

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
          error,
          pasarActividades
      }) 
  } else {
      //Insertar datos ya validados
      
      await Actividades.update(
          {nombre: nombre},
        
          {where: { id: req.params.id}}

          );
      res.redirect('/')

      //UPDATE actividades SET nombre = 'Nuevo' WHERE id = id
  }
}

exports.actividadesURL = async (req,res,next)=>{
    // res.send(req.params.id)
    // const pasarActividades = await Actividades.findAll();  //Equivale a SELECT * FROM actividades
    // const actividades = await Actividades.findOne({
    //     where: {
    //        idActividades: req.params.id
    //     }
    // })


    const pasarActividadesPromesa =  Actividades.findAll();  //Equivale a SELECT * FROM actividades
    const actidadesPromesa =  Actividades.findOne({
        where: {
            idActividades: req.params.id
        }
    });

    const [pasarActividades,actividades] = await Promise.all([pasarActividadesPromesa,actidadesPromesa])


    //SELECT * FROM actividades WHERE id = 1;
    if(!actividades){
        return next();
    }

    
    //Enviamos las vistas
    res.render('tareas', {
        nombrePagina: 'Tareas de las actividades',
        actividades,
        pasarActividades
    })
}

exports.actividadesEditarForm =  async (req,res) => {
    // const pasarActividades = await Actividades.findAll();  //Equivale a SELECT * FROM actividades
    // const actidades = await Actividades.findOne({
    //     where: {
    //         id: req.params.id
    //     }
    // });


    const pasarActividadesPromesa =  Actividades.findAll();  //Equivale a SELECT * FROM actividades
    const actidadesPromesa =  Actividades.findOne({
        where: {
            id: req.params.id
        }
    });

    const [pasarActividades,actividades] = await Promise.all([pasarActividadesPromesa,actidadesPromesa])

    res.render('nuevaActividad',{
        nombrePagina: 'Editando',
        pasarActividades,
        actividades
    })
}