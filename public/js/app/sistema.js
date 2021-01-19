import Swal from 'sweetalert2';
import axios from 'axios';


const botonEliminar = document.querySelector('#eliminar-actividad');

if(botonEliminar){


botonEliminar.addEventListener('click', e =>{
    const idActividadesServidor = e.target.dataset.acividadesId; //obtenemos datos del cliente

   // console.log(idActividadesServidor)

    Swal.fire({
        title: '¿Estas seguro?',
        text: "No podras volver a recuperar las tareas de este proyecto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Borra esta actividad!',
        cancelButtonText: 'No,borrar!'
      }).then((result) => {
        if (result.isConfirmed) {

         const getURl =   `${location.origin}/actividades/${idActividadesServidor}`   
         //console.log(getURl)
            
         axios.delete(getURl, {
             params: {idActividadesServidor}  
            })
            .then((enviarRepuesta) =>{
                console.log(enviarRepuesta)

            
                Swal.fire(
                    'Borrado!',
                    enviarRepuesta.data   ,
                    'success'
                  )
        
                  //Logica de la BD 
                  setTimeout(()=>{
                      window.location.href = '/'
                  },1000)

            })
            .catch(()=>{
                Swal.fire(
                    'No se puede borrar!',
                    'No se pudo borrar'   ,
                    'success'
                  )
            })


 
        }
      })
})

};


export default botonEliminar;