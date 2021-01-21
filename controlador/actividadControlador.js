const Actividades = require('../modelo/Actividades');
const Tareas = require('../modelo/tareadeActividades')
const slug = require('slug');

exports.activdadesInicio =async (req,res) => {
    //Buscamos las actividades hacermos consultas
    
    const usuarioUid = res.locals.enviarUsuario.uid
    
    const pasarActividades = await Actividades.findAll({
        where: {
            usuarioUid
        }
    });  //Equivale a SELECT * FROM actividades


    res.render('index',{
        nombrePagina: 'Inicio',
        pasarActividades
    });
}

exports.formumlarioActividades = async (req,res) => {
   // const pasarActividades = await Actividades.findAll();  //Equivale a SELECT * FROM actividades
   const usuarioUid = res.locals.enviarUsuario.uid
   const pasarActividades = await Actividades.findAll({
    where: {
        usuarioUid
    }
});  //Equivale a SELECT * FROM actividades
   
    res.render('nuevaActividad', {
        nombrePagina: 'Nueva actividad',
        pasarActividades
    })
}

exports.nuevoActividad = async (req,res) => {
     // const pasarActividades = await Actividades.findAll();  //Equivale a SELECT * FROM actividades
  
    //Send.exports
    //console.log(req.body)

    //Valida el formulario
    const usuarioUid = res.locals.enviarUsuario.uid
    const pasarActividades = await Actividades.findAll({
        where: {
            usuarioUid
        }
    });  //Equivale a SELECT * FROM actividades

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
            //insertamos al usuario
        const usuarioUid = res.locals.enviarUsuario.uid
        await Actividades.create({nombre,usuarioUid });
        res.redirect('/')

    }
}


exports.actualizaActividad = async (req,res) => {
    //const pasarActividades = await Actividades.findAll();  //Equivale a SELECT * FROM actividades

  //Send.exports
  //console.log(req.body)

  const usuarioUid = res.locals.enviarUsuario.uid
    
  const pasarActividades = await Actividades.findAll({
      where: {
          usuarioUid
      }
  });  //Equivale a SELECT * FROM actividades



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


    const usuarioUid = res.locals.enviarUsuario.uid
    
    const pasarActividadesPromesa =  Actividades.findAll({
        where: {
            usuarioUid
        }
    });  //Equivale a SELECT * FROM actividades

  //  const pasarActividadesPromesa =  Actividades.findAll();  //Equivale a SELECT * FROM actividades
    const actidadesPromesa =  Actividades.findOne({
        where: {
            idActividades: req.params.url,
            usuarioUid
        }
    });

    const [pasarActividades,actividades] = await Promise.all([pasarActividadesPromesa,actidadesPromesa]);

    //Hacer un select a tarea,
    


    const tareas = await Tareas.findAll({
      where: {
        actividadeId : actividades.id
      }
    });

   
 
   



    //SELECT * FROM actividades WHERE id = 1;
    if(!actividades){
        return next();
    }

    
    //Enviamos las vistas
    res.render('tareas', {
        nombrePagina: 'Tareas de las actividades',
        actividades,
        pasarActividades,
        tareas
    })
}

exports.actividadesEditarForm =  async (req,res) => {
    // const pasarActividades = await Actividades.findAll();  //Equivale a SELECT * FROM actividades
    // const actidades = await Actividades.findOne({
    //     where: {
    //         id: req.params.id
    //     }
    // });

    const usuarioUid = res.locals.enviarUsuario.uid
    
    const pasarActividadesPromesa =  Actividades.findAll({
        where: {
            usuarioUid
        }
    });  //Equivale a SELECT * FROM actividades


   // const pasarActividadesPromesa =  Actividades.findAll();  //Equivale a SELECT * FROM actividades
    const actidadesPromesa =  Actividades.findOne({
        where: {
            id: req.params.id,
            usuarioUid
        }
    });

    const [pasarActividades,actividades] = await Promise.all([pasarActividadesPromesa,actidadesPromesa])

    res.render('nuevaActividad',{
        nombrePagina: 'Editando',
        pasarActividades,
        actividades
    })
}

exports.eliminarActividades = async (req,res,next) => {
    //console.log(req.query)

    const {idActividadesServidor} = req.query;

    const getSucess = await Actividades.destroy({
        where: { 
            idActividades : idActividadesServidor
          }
    })  // DELETE FROM 'tabla' WHERE ID = idActividadesServidor

    if(!getSucess){
    return next();
    }
    res.status(200).send('Actividades Eliminado correctamente.')

}