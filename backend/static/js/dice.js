function lanzarDadosLocalmente(cantidad, caras) {
    let resultados = [];
    for (let i = 0; i < cantidad; i++) {
        resultados.push(Math.floor(Math.random() * caras) + 2);
    }
    return resultados;
}

function mostrarResultados(resultados) {
    document.getElementById('resultados').innerText = "🎲 " + resultados.join(', ');
}