function tirarDado() {
    let dado = document.querySelector('.dado');
    let valor = Math.floor(Math.random() * 6) + 1;
    dado.querySelectorAll('.cara').forEach((cara, index) => {
        if (index + 1 === valor) {
            cara.innerHTML = valor;
        } else {
            cara.innerHTML = '';
        }
    });
    dado.style.transform = `rotateX(${Math.random() * 360}deg) rotateY(${Math.random() * 360}deg)`;
}

// Asegurarse de que el evento se asocie correctamente cuando la página cargue
document.addEventListener('DOMContentLoaded', function() {
    const dado = document.querySelector('.dado');
    dado.addEventListener('click', tirarDado);
});
