// Función para guardar el resultado del dado en el localStorage
function guardarResultado(resultado) {
    let resultados = JSON.parse(localStorage.getItem('resultados')) || [];  // Obtener resultados previos o inicializar el array vacío
    resultados.push(resultado);  // Agregar el nuevo resultado al array
    localStorage.setItem('resultados', JSON.stringify(resultados));  // Guardar el array actualizado en el localStorage
}

// Función para mostrar los resultados almacenados en la página
function mostrarResultados() {
    let resultados = JSON.parse(localStorage.getItem('resultados')) || [];
    const resultadosDiv = document.querySelector('.resultados');
    resultadosDiv.innerHTML = '';  // Limpiar la sección de resultados antes de agregar los nuevos

    if (resultados.length > 0) {
        let lista = '<ul>';
        resultados.forEach((resultado, index) => {
            lista += `<li>Lanzamiento ${index + 1}: ${resultado}</li>`;
        });
        lista += '</ul>';
        resultadosDiv.innerHTML = lista;  // Mostrar los resultados almacenados
    } else {
        resultadosDiv.innerHTML = '<p>No hay resultados almacenados.</p>';
    }
}

// Modificar la función tirarDado para guardar el resultado al hacer clic
function tirarDado() {
    let dado = document.querySelector('.dado');
    let valor = Math.floor(Math.random() * 6) + 1;  // Genera un número aleatorio entre 1 y 6

    // Limpia el contenido de las caras del dado
    dado.querySelectorAll('.cara').forEach((cara) => {
        cara.innerHTML = '';
    });

    // Muestra el número aleatorio en la cara correspondiente
    dado.querySelector(`.cara:nth-child(${valor})`).innerHTML = valor;

    // Aplica una rotación aleatoria al dado
    dado.style.transform = `rotateX(${Math.random() * 360}deg) rotateY(${Math.random() * 360}deg)`;

    // Guardar el resultado en el localStorage
    guardarResultado(valor);
}

// Asegurarse de que el evento se asocie correctamente cuando la página cargue
document.addEventListener('DOMContentLoaded', function() {
    const dado = document.querySelector('.dado');
    dado.addEventListener('click', tirarDado);

    // Mostrar los resultados almacenados
    mostrarResultados();
});
