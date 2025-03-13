function guardarHistorial(resultados) {
    let historial = JSON.parse(localStorage.getItem('historial')) || [];
    historial.push(resultados);
    localStorage.setItem('historial', JSON.stringify(historial));
}

function obtenerHistorial() {
    return JSON.parse(localStorage.getItem('historial')) || [];
}

function limpiarHistorial() {
    localStorage.removeItem('historial');
}