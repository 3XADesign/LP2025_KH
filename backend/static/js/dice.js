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
}

// Asocia el evento de clic al dado cuando el contenido de la página esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    const dado = document.querySelector('.dado');
    dado.addEventListener('click', tirarDado);
});
