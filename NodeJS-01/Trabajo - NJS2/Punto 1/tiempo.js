function tiempoActual(){
    const tiempo = new Date();
    return tiempo.toLocaleTimeString();
}

function fechaActual(){
    const fecha = new Date();
    return fecha.toLocaleDateString();
}


module.exports = {
    tiempoActual,
    fechaActual
};