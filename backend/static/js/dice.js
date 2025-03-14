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
            cara.textContent = j; // Añade el número de la cara
            dadoInner.appendChild(cara);
        }

        // Agrega una rotación aleatoria antes de caer en la posición final
        dadoInner.style.transform = `rotateX(${Math.random() * 720}deg) rotateY(${Math.random() * 720}deg)`;

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
        }, 200);

        dado.appendChild(dadoInner);
        resultadosDiv.appendChild(dado);
    }
}