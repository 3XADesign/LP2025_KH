function lanzarDados() {
    const cantidad = document.getElementById("cantidad").value;
    const caras = document.getElementById("caras").value;
    let resultados = [];

    // Obtener el elemento del dado
    const dado = document.querySelector(".dado-3d");

    // Remover la clase de animación si ya está presente
    dado.classList.remove("animar-giro");

    // Forzar un reflow para reiniciar la animación
    void dado.offsetWidth;

    // Agregar la clase de animación
    dado.classList.add("animar-giro");

    // Generar resultados aleatorios
    for (let i = 0; i < cantidad; i++) {
        const resultado = Math.floor(Math.random() * caras) + 1;
        resultados.push(resultado);
    }

    // Mostrar los puntos correspondientes al resultado en todas las caras
    setTimeout(() => {
        const carasDado = ["frente", "atras", "izquierda", "derecha", "arriba", "abajo"];

        carasDado.forEach((cara) => {
            const puntos = document.querySelectorAll(`#cara-${cara} .punto`);
            puntos.forEach(punto => punto.classList.remove("mostrar-punto")); // Ocultar todos los puntos

            switch (resultados[0]) {
                case 1:
                    document.getElementById(`${cara}-p1`).classList.add("mostrar-punto");
                    break;
                case 2:
                    document.getElementById(`${cara}-p2`).classList.add("mostrar-punto");
                    document.getElementById(`${cara}-p5`).classList.add("mostrar-punto");
                    break;
                case 3:
                    document.getElementById(`${cara}-p1`).classList.add("mostrar-punto");
                    document.getElementById(`${cara}-p2`).classList.add("mostrar-punto");
                    document.getElementById(`${cara}-p5`).classList.add("mostrar-punto");
                    break;
                case 4:
                    document.getElementById(`${cara}-p2`).classList.add("mostrar-punto");
                    document.getElementById(`${cara}-p3`).classList.add("mostrar-punto");
                    document.getElementById(`${cara}-p4`).classList.add("mostrar-punto");
                    document.getElementById(`${cara}-p5`).classList.add("mostrar-punto");
                    break;
                case 5:
                    document.getElementById(`${cara}-p1`).classList.add("mostrar-punto");
                    document.getElementById(`${cara}-p2`).classList.add("mostrar-punto");
                    document.getElementById(`${cara}-p3`).classList.add("mostrar-punto");
                    document.getElementById(`${cara}-p4`).classList.add("mostrar-punto");
                    document.getElementById(`${cara}-p5`).classList.add("mostrar-punto");
                    break;
                case 6:
                    document.getElementById(`${cara}-p2`).classList.add("mostrar-punto");
                    document.getElementById(`${cara}-p3`).classList.add("mostrar-punto");
                    document.getElementById(`${cara}-p4`).classList.add("mostrar-punto");
                    document.getElementById(`${cara}-p5`).classList.add("mostrar-punto");
                    document.getElementById(`${cara}-p6`).classList.add("mostrar-punto");
                    document.getElementById(`${cara}-p7`).classList.add("mostrar-punto");
                    break;
            }
        });

        // Mostrar los resultados en la sección de resultados
        document.getElementById("resultados").innerText = resultados.join(", ");
    }, 1000); // Esperar 1 segundo (duración de la animación)
}