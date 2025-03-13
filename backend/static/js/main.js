function lanzarDados() {
    let cantidad = document.getElementById('cantidad').value;
    let caras = document.getElementById('caras').value;

    fetch(`/lanzar/${cantidad}/${caras}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('resultados').innerText = "🎲 " + data.resultados.join(', ');
        })
        .catch(error => console.error('Error:', error));
}
function limpiarHistorialUI() {
    limpiarHistorial();  // Borra los datos del almacenamiento local
    document.getElementById('resultados').innerText = "Historial limpiado.";
}