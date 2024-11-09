import { isThisMonth, parseISO } from "date-fns";

const cargarTotalGastado = () => {
    const gastos = JSON.parse(window.localStorage.getItem('gastos'));
    const totalGastado = document.getElementById('total-gastado');

    let valorTotalGastado = 0;
    if(gastos){
        // extraer de los gastos los que sean del mes actual
        const gastosMes = gastos.filter((gasto) => {
            if(isThisMonth(parseISO(gasto.fecha))){
                return gasto;
            }
        })

        // agregar total gastado del mes
        if(gastosMes){
            gastosMes.forEach((gasto) => {
                valorTotalGastado+= parseFloat(gasto.precio);
            });
        }
    }

    // formato moneda
    const formatoMoneda = new Intl.NumberFormat('es-CO', {style: 'currency', currency: 'COP'});
    totalGastado.innerText = formatoMoneda.format(valorTotalGastado);

};

export default cargarTotalGastado;