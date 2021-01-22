import Swal from 'sweetalert2';
export  const barrita = () =>{

    
    const misTareas = document.querySelectorAll('li.tarea');

    if(misTareas.length) {
        //Select Barra y que busque las tareas.
        const mistareasCompleta = document.querySelectorAll('i.marcado');

        //check
        const calcular = Math.round((mistareasCompleta.length / misTareas.length) * 100);

        const checkInicio = document.querySelector('#subirPorcentaje');
        checkInicio.style.width = calcular + "%"

        if(calcular === 100){
            Swal.fire(
                'Actividad Completa',
                'Haz terminado toda las tareas',
                 'success'
            )
        }

    }



}

