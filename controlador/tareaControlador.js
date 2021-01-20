const Actividades = require('../modelo/Actividades');
const Tareas = require('../modelo/tareadeActividades')
exports.agregandoTarea = async (req,res,next) => {
    //select * from actividades Where id = numero LIMIT 1;

   const actividades = await Actividades.findOne({
        where: {
            idActividades :req.params.id
        }

   })

   //Se hace la consulta que se hizo anteriormente

   //traer el valor del input

   const {tarea} = req.body;
   
   const disponibilidad = 0;
   const actividadeId = actividades.id;
   
   //insertamos datos
 const funciona =  Tareas.create({
    tarea,disponibilidad,actividadeId
   })

   if(!funciona){
       return next();
   }

   res.redirect(`/actividades/${req.params.id}`)
}


exports.cambiaTareaForm = async (req,res,next) => {
    //console.log(req.params)
    const { id } = req.params;
    const miTarea = await Tareas.findOne({
        where: {
            id
        }
    });

   // console.log(miTarea)

   //Actualizamos datos

   let disponibilidad = 0;

   if(miTarea.disponibilidad === disponibilidad) {
       disponibilidad = 1;
   } 
   
   miTarea.disponibilidad = disponibilidad;

   const enviarDatos = await miTarea.save();

   if(!enviarDatos){
       return next();
   }

    res.status(200).send('Tarea Actualizada')
}

exports.eliminarTareaForm = async (req,res,next) => {
//     //console.log(req.params)
//     const { id } = req.params;
//     const miTarea = await Tareas.findOne({
//         where: {
//             id
//         }
//     });

//    // console.log(miTarea)

//    //Actualizamos datos

//    let disponibilidad = 0;

//    if(miTarea.disponibilidad === disponibilidad) {
//        disponibilidad = 1;
//    } 
   
//    miTarea.disponibilidad = disponibilidad;

//    const enviarDatos = await miTarea.save();

//    if(!enviarDatos){
//        return next();
//    }

//     res.status(200).send('Tarea Actualizada')

const { id } = req.params;

//Eliminar

const borrarTarea = await Tareas.destroy({
    where: {id}
})

if(!borrarTarea) {
    return next();
}

res.status(200).send('Se ha borrado esta tarea')
}
