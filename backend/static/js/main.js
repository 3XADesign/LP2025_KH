function lanzarDados() {
    const dado = document.querySelector(".dado-3d");
    

    // Reiniciar animación
    dado.classList.remove("animar-giro");
    requestAnimationFrame(() => dado.classList.add("animar-giro"));

    // Generar número aleatorio (1-6)
    setTimeout(() => {
        const resultado = Math.floor(Math.random() * 6) + 1;

        // Determinar valores de cada cara
        const valoresCaras = {
            frente: resultado,
            atras: 7 - resultado, // Cara opuesta
            izquierda: resultado === 1 ? 3 : (resultado === 6 ? 4 : 2),
            derecha: 7 - (resultado === 1 ? 3 : (resultado === 6 ? 4 : 2)), // Opuesta de izquierda
            arriba: resultado === 1 ? 5 : (resultado === 6 ? 2 : 4),
            abajo: 7 - (resultado === 1 ? 5 : (resultado === 6 ? 2 : 4)) // Opuesta de arriba
        };

        actualizarCarasDado(valoresCaras);

        // Mostrar el resultado en pantalla
        document.getElementById("resultados").innerText = `Dado: ${resultado}`;
    }, 1000);
}

function actualizarCarasDado(valoresCaras) {
    const carasDado = ["frente", "atras", "izquierda", "derecha", "arriba", "abajo"];

    const configuracionesPuntos = {
        1: ["p1"],
        2: ["p2", "p5"],
        3: ["p1", "p2", "p5"],
        4: ["p2", "p3", "p4", "p5"],
        5: ["p1", "p2", "p3", "p4", "p5"],
        6: ["p2", "p3", "p4", "p5", "p6", "p7"]
    };

    carasDado.forEach(cara => {
        document.querySelectorAll(`#cara-${cara} .punto`).forEach(punto => 
            punto.classList.remove("mostrar-punto")
        );

        configuracionesPuntos[valoresCaras[cara]].forEach(puntoId => 
            document.getElementById(`${cara}-${puntoId}`).classList.add("mostrar-punto")
        );
    });
}
