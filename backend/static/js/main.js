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