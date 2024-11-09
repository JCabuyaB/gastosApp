import { cerrarFormulario } from "./eventos/abrirCerrarFormulario";
import cargarGastos from "./cargarGastos";
import cargarTotalGastado from "./cargarTotalGastado";
// id
import { v4 as uuidv4 } from 'uuid';

const formulario = document.getElementById('formulario-gasto__form');
const descripcion = document.getElementById('descripcion');
const precio = document.getElementById('precio');

// validar campos
const regExpDescripcion = /^[a-zA-Z_\-\ ]{4,25}$/;
const regExpPrecio = /^\d+(\.\d+)?$/;

const validarDescripcion = () => {
    if(!regExpDescripcion.test(descripcion.value)){
        descripcion.classList.add('formulario-gasto__input--error');
        descripcion.parentElement.querySelector('.formulario-gasto__leyenda').classList.add('formulario-gasto__leyenda--active');
        return false;
    }else{
        descripcion.classList.remove('formulario-gasto__input--error');
        descripcion.parentElement.querySelector('.formulario-gasto__leyenda').classList.remove('formulario-gasto__leyenda--active');
        return true;
    }
}
const validarPrecio = () => {
    if(!regExpPrecio.test(precio.value)){
        precio.classList.add('formulario-gasto__input--error');
        precio.parentElement.querySelector('.formulario-gasto__leyenda').classList.add('formulario-gasto__leyenda--active');
        return false;
    }else{
        precio.classList.remove('formulario-gasto__input--error');
        precio.parentElement.querySelector('.formulario-gasto__leyenda').classList.remove('formulario-gasto__leyenda--active');
        return true;
    }
} 

// validar al quitar foco
descripcion.addEventListener('blur', (e) => validarDescripcion());
precio.addEventListener('blur', (e) => validarPrecio());

// validar al levantar tecla
descripcion.addEventListener('keyup', (e) => {
    if(descripcion.classList.contains('formulario-gasto__input--error')){
        validarDescripcion();
    };
});
precio.addEventListener('keyup', (e) => {
    if(precio.classList.contains('formulario-gasto__input--error')){
        validarPrecio();
    };
});

// validar al enviar formulario
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    if(validarDescripcion() && validarPrecio()){
        const nuevoGasto = {
            id: uuidv4(),
            descripcion: descripcion.value,
            precio: precio.value,
            fecha: new Date()
        }
        
        
        
        // obtener gastos de localStorage
        const gastos = JSON.parse(window.localStorage.getItem('gastos'));
        
        const modo = formulario.closest('.formulario-gasto').dataset?.modo;
        // editar gasto
        if(modo === 'editar-gasto'){
            // id a editar
            const id = formulario.closest('.formulario-gasto').dataset?.id;

            // extraer valores del formulario
            const valorDescripcion = descripcion.value;
            const valorPrecio = precio.value;

            let indexEditar; 
            if(id && gastos){
                gastos.forEach((gasto, index) => {
                    if(gasto.id === id){
                        indexEditar = index;
                    }
                });
            }
            

            // copiar gastos
            const nuevosGastos = [...gastos];
            // editar el elemento en la posicion correspondiente
            nuevosGastos[indexEditar] = {
                ...gastos[indexEditar],
                descripcion: valorDescripcion,
                precio: valorPrecio
            }

            // guardar en localStorage
            window.localStorage.setItem('gastos', JSON.stringify(nuevosGastos));
        }else if(modo === 'agregar-gasto'){
            if(gastos){
                // extraer gastos y agregar nuevo
                const nuevosGastos = [...gastos, nuevoGasto];
                // reemplazar datos del localStorage
                window.localStorage.setItem('gastos', JSON.stringify(nuevosGastos));
            }else{
                // agregar primer gasto
                window.localStorage.setItem('gastos', JSON.stringify([{ ...nuevoGasto}]));
            }
        }

        cargarTotalGastado();
        cerrarFormulario();
        cargarGastos();
        descripcion.value = '';
        precio.value = '';
    }
})