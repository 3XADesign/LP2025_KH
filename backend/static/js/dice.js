function lanzarDados() {
    let cantidad = parseInt(document.getElementById("cantidad").value);
    let resultadosDiv = document.getElementById("resultados");
    resultadosDiv.innerHTML = "";

    for (let i = 0; i < cantidad; i++) {
        let valorDado = Math.floor(Math.random() * 6) + 1;

        let dado = document.createElement("div");
        dado.classList.add("dado");

        let dadoInner = document.createElement("div");
        dadoInner.classList.add("dado-inner");

        for (let j = 1; j <= 6; j++) {
            let cara = document.createElement("div");
            cara.classList.add("cara", `cara-${j}`);

            // Añadir puntos según el valor de la cara
            switch (j) {
                case 1:
                    cara.innerHTML = '<div class="punto centro"></div>';
                    break;
                case 2:
                    cara.innerHTML = '<div class="punto esquina sup-izq"></div><div class="punto esquina inf-der"></div>';
                    break;
                case 3:
                    cara.innerHTML = '<div class="punto esquina sup-izq"></div><div class="punto centro"></div><div class="punto esquina inf-der"></div>';
                    break;
                case 4:
                    cara.innerHTML = '<div class="punto esquina sup-izq"></div><div class="punto esquina sup-der"></div><div class="punto esquina inf-izq"></div><div class="punto esquina inf-der"></div>';
                    break;
                case 5:
                    cara.innerHTML = '<div class="punto esquina sup-izq"></div><div class="punto esquina sup-der"></div><div class="punto centro"></div><div class="punto esquina inf-izq"></div><div class="punto esquina inf-der"></div>';
                    break;
                case 6:
                    cara.innerHTML = '<div class="punto esquina sup-izq"></div><div class="punto esquina sup-der"></div><div class="punto centro-izq"></div><div class="punto centro-der"></div><div class="punto esquina inf-izq"></div><div class="punto esquina inf-der"></div>';
                    break;
            }

            dadoInner.appendChild(cara);
        }

        // Rotación inicial aleatoria
        dadoInner.style.transform = `rotateX(${Math.random() * 360}deg) rotateY(${Math.random() * 360}deg)`;

        // Rotación final según el valor del dado
        setTimeout(() => {
            let rotaciones = {
                1: "rotateX(0deg) rotateY(0deg)",
                2: "rotateY(-90deg)",
                3: "rotateY(180deg)",
                4: "rotateY(90deg)",
                5: "rotateX(90deg)",
                6: "rotateX(-90deg)"
            };

            dadoInner.style.transition = "transform 1s ease-in-out";
            dadoInner.style.transform = rotaciones[valorDado];
        }, 100);

        dado.appendChild(dadoInner);
        resultadosDiv.appendChild(dado);
    }
}

function limpiarResultados() {
    document.getElementById("resultados").innerHTML = "";
}