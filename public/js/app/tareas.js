import axios from "axios";
import Swal from 'sweetalert2';

const tareas = document.querySelector('.listado-pendientes');


if(tareas) {

    tareas.addEventListener('click', (e) =>{
        //console.log(e.target.classList)
        

        if(e.target.classList.contains('fa-check-circle')){
            const imagenRuedaCheck = e.target;
            const idTareaActividades = imagenRuedaCheck.parentElement.parentElement.dataset.tarea;
           // const tareaIDUsuario = 0;
          // console.log(idTareaActividades)

          //Hacer una conexion del servidor desde el cleinte hacia '/misTareas/:id'

          const mistareaURL = `${location.origin}/misTareas/${idTareaActividades}`;  
       
         // console.log(mistareaURL)
         axios.patch(mistareaURL, {idTareaActividades} )
            .then((res)=> {
               // console.log(res)
                    if(res.status === 200){
                        imagenRuedaCheck.classList.toggle('completo')
                       // console.log(imagenRuedaCheck)
                    }
            })
        }

        if(e.target.classList.contains('fa-trash')){
            const traerTareaHtml = e.target.parentElement.parentElement,
                idMistareas =  traerTareaHtml.dataset.tarea;           
            // console.log(traerTareaHtml)
            // console.log(idMistareas)


            Swal.fire({
                title: '¿Estas seguro?',
                text: "No podras volver a recuperar las tareas de este proyecto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Borra esta tarea!',
                cancelButtonText: 'No,borrar!'
              }).then((result) => {
                  if(result.value) {
                     // console.log('Ha sido borrado')
                     //Enviamos datos al backend
                     const mistareaURL = `${location.origin}/misTareas/${idMistareas}`;  

                     axios.delete(mistareaURL, { params: { idMistareas } })
                        .then((res) => {
                            console.log(res)
                           if(res.status === 200){
                          //  imagenRuedaCheck.classList.toggle('completo')
                           // Eliminamos el li del html
                           traerTareaHtml.parentElement.removeChild(traerTareaHtml)

                           //alerta
                           Swal.fire(
                               'Tarea Eliminada',
                               res.data,
                                'success'
                           )
                        }
                        })
                  }

              })
        }

    } )

}


export default tareas;