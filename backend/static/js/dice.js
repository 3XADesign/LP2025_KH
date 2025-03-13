function lanzarDados() {
    let cantidad = document.getElementById("cantidad").value;
    let resultadosDiv = document.getElementById("resultados");
    resultadosDiv.innerHTML = ""; // Limpiar resultados anteriores

    cantidad = parseInt(cantidad);

    if (cantidad < 1) {
        alert("⚠️ La cantidad de dados debe ser al menos 1.");
        return;
    }

    for (let i = 0; i < cantidad; i++) {
        let valorDado = Math.floor(Math.random() * 6) + 1;
        let dado = document.createElement("div");
        dado.classList.add("dado");

        let puntos = document.createElement("div");
        puntos.classList.add("puntos");

        // Crear los 9 puntos posibles
        for (let j = 1; j <= 9; j++) {
            let punto = document.createElement("div");
            punto.classList.add("punto", `punto-${j}`);
            puntos.appendChild(punto);
        }

        // Ocultar todos los puntos primero
        puntos.querySelectorAll(".punto").forEach(punto => {
            punto.style.opacity = "0";
        });

        // Mostrar solo los puntos correctos según el número obtenido
        switch (valorDado) {
            case 1:
                puntos.querySelector(".punto-1").style.opacity = "1"; // Punto central
                break;
            case 2:
                puntos.querySelector(".punto-2").style.opacity = "1"; // Superior izquierdo
                puntos.querySelector(".punto-3").style.opacity = "1"; // Superior derecho
                break;
            case 3:
                puntos.querySelector(".punto-2").style.opacity = "1"; // Superior izquierdo
                puntos.querySelector(".punto-1").style.opacity = "1"; // Central
                puntos.querySelector(".punto-3").style.opacity = "1"; // Superior derecho
                break;
            case 4:
                puntos.querySelector(".punto-2").style.opacity = "1"; // Superior izquierdo
                puntos.querySelector(".punto-3").style.opacity = "1"; // Superior derecho
                puntos.querySelector(".punto-4").style.opacity = "1"; // Inferior izquierdo
                puntos.querySelector(".punto-5").style.opacity = "1"; // Inferior derecho
                break;
            case 5:
                puntos.querySelector(".punto-2").style.opacity = "1"; // Superior izquierdo
                puntos.querySelector(".punto-3").style.opacity = "1"; // Superior derecho
                puntos.querySelector(".punto-4").style.opacity = "1"; // Inferior izquierdo
                puntos.querySelector(".punto-5").style.opacity = "1"; // Inferior derecho
                puntos.querySelector(".punto-1").style.opacity = "1"; // Central
                break;
            case 6:
                puntos.querySelector(".punto-2").style.opacity = "1"; // Superior izquierdo
                puntos.querySelector(".punto-3").style.opacity = "1"; // Superior derecho
                puntos.querySelector(".punto-4").style.opacity = "1"; // Inferior izquierdo
                puntos.querySelector(".punto-5").style.opacity = "1"; // Inferior derecho
                puntos.querySelector(".punto-8").style.opacity = "1"; // Medio izquierdo
                puntos.querySelector(".punto-9").style.opacity = "1"; // Medio derecho
                break;
        }

        dado.appendChild(puntos);
        resultadosDiv.appendChild(dado);
    }
}