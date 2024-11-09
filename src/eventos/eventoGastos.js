import { abrirFormulario } from "./abrirCerrarFormulario";
import cargarGastos from "../cargarGastos";
import cargarTotalGastado from "../cargarTotalGastado";

const contenedorGastos = document.querySelector('.gastos__lista');

contenedorGastos.addEventListener('click', (e) => {
    const gasto = e.target.closest('.gasto');

    if(gasto){
        if(gasto.scrollLeft > 0){
            gasto.querySelector('.gasto__info').scrollIntoView({
                behavior: 'smooth',
                inline: 'start',                
                block: 'nearest'
            });
        }else{
            gasto.querySelector('.gasto__acciones').scrollIntoView({
                behavior: 'smooth',
                inline: 'end',
                block: 'nearest'
            });
        }
    }

    if(e.target.closest('button')){
        const button = e.target.closest('button');

        // id gasto
        const id = button.closest('.gasto').dataset?.id;

        if(button.dataset?.accion === 'editar-gasto'){
            // extraer datos del gasto a editar
            document.getElementById('formulario-gasto').dataset.id = id;

            const gastos = JSON.parse(window.localStorage.getItem('gastos'));

            let indexGasto;
            if(gastos){
                gastos.forEach((gasto, index) => {
                    if(gasto.id === id){
                        indexGasto = index;
                    }
                });
                const {descripcion, precio} = gastos[indexGasto];
                document.getElementById('descripcion').value = descripcion;
                document.getElementById('precio').value = precio;
            }
            
            abrirFormulario('editarGasto');
        }else if(button.dataset?.accion === 'eliminar-gasto'){
            // extraer gastos para eliminar el gasto con su id
            const gastos = JSON.parse(window.localStorage.getItem('gastos'));
            
            if(gastos){
                const nuevosGastos = gastos.filter((gasto) => {
                    if(gasto.id !== id){
                        return gasto
                    }
                });

                // actualizar localStorage
                window.localStorage.setItem('gastos', JSON.stringify(nuevosGastos));
            } 

            // cargar gastos y total gastado
            cargarGastos()
            cargarTotalGastado();
        }
    }
});