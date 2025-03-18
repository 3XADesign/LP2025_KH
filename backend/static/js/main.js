document.addEventListener('DOMContentLoaded', () => {
    const savedResults = getSavedResults();
    if (savedResults.length > 0) {
        const diceContainer = document.getElementById('diceContainer');
        const resultBox = document.getElementById('resultBox');
        resultBox.textContent = `Resultados: ${savedResults.join(', ')}`;
        savedResults.forEach(result => {
            const dice = createDice(result);
            diceContainer.appendChild(dice);
        });
    }
});

function getSavedResults() {
    // Simulación de resultados guardados
    return [1, 2, 3, 4, 5, 6];
}

function createDice(result) {
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

    let rotaciones = {
        1: "rotateX(0deg) rotateY(0deg)",
        2: "rotateY(-90deg)",
        3: "rotateY(180deg)",
        4: "rotateY(90deg)",
        5: "rotateX(90deg)",
        6: "rotateX(-90deg)"
    };

    dadoInner.style.transform = rotaciones[result];
    dado.appendChild(dadoInner);

    return dado;
}