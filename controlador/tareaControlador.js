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