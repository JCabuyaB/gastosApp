const formulario = document.getElementById("formulario-gasto");
const agregarBtn = document.getElementById("toggle-form-gasto");

const abrirFormulario = (modo = 'agregarGasto') => {
    // agregar clases
    formulario.classList.add("formulario-gasto--active");
    agregarBtn.classList.add("agregar-gasto__btn--active");

    // adecuar formulario para editar
    if(modo === 'editarGasto'){
        formulario.dataset.modo = 'editar-gasto';
        formulario.querySelector('.formulario-gasto__titulo').innerText = 'Editar gasto';
        formulario.querySelector('.formulario-gasto__btn').innerText = 'Editar gasto';
        return;
    }
    
    // adecuar formulario para agregar
    formulario.dataset.modo = 'agregar-gasto';
    formulario.querySelector('.formulario-gasto__titulo').innerText = 'Agregar gasto';
    formulario.querySelector('.formulario-gasto__btn').innerText = 'Agregar gasto';
};

const cerrarFormulario = () => {
    // remover clases
    formulario.classList.remove("formulario-gasto--active");
    agregarBtn.classList.remove("agregar-gasto__btn--active");

    // adecuar formulario para agregar
    formulario.dataset.modo = 'agregar-gasto';
    formulario.querySelector('.formulario-gasto__titulo').innerText = 'Agregar gasto';
    formulario.querySelector('.formulario-gasto__btn').innerText = 'Agregar gasto';

    const id = formulario.dataset?.id;
    // remover id si tiene
    if(id){
        formulario.removeAttribute('data-id');
        document.getElementById('descripcion').value = '';
        document.getElementById('precio').value = '';
    }
};

// evento del boton
agregarBtn.addEventListener("click", () => {
    if (agregarBtn.classList.contains("agregar-gasto__btn--active")) {
        cerrarFormulario();
    } else {
        abrirFormulario();
    }
});

export {cerrarFormulario, abrirFormulario};