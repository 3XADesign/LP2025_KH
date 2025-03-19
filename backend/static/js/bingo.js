
let jugadores = [];
    let turnoJugador = 0;
    let gameOver = false;
    let intentosMaximos = 20;

    // Generación del tablero de Bingo (números del 1 al 12)
    function generarTablero() {
        return Array.from({ length: 12 }, (_, i) => i + 1);
    }

    // Mostrar los tableros de todos los jugadores
    function mostrarTableros() {
        let playerBoardsHTML = '';
        jugadores.forEach((jugador, index) => {
            playerBoardsHTML += `
                <div class="player">
                    <p class="player-name">${jugador.nombre}</p>
                    <div class="board" id="board-${index}">
                        ${jugador.tablero.map(num => `
                            <div class="cell" id="cell-${index}-${num}">${num}</div>
                        `).join('')}
                    </div>
                    <p>Intentos restantes: <span id="intentos-${index}">${intentosMaximos - jugador.intentos}</span></p>
                </div>
            `;
        });
        document.getElementById('player-boards').innerHTML = playerBoardsHTML;
    }

    // Marcar el número en el tablero del jugador
    function marcarNumero(num, jugadorIndex) {
        const jugador = jugadores[jugadorIndex];
        if (!jugador.numerosMarcados.includes(num) && jugador.tablero.includes(num)) {
            jugador.numerosMarcados.push(num);
            document.getElementById(`cell-${jugadorIndex}-${num}`).classList.add('marked');
        }
    }

    // Función para generar números
    function generarNumero() {
        if (gameOver) return; // Si el juego terminó, no hacer nada

        const jugador = jugadores[turnoJugador];

        if (jugador.intentos >= intentosMaximos) {
            document.getElementById('status').textContent = `${jugador.nombre} se ha quedado sin intentos. El juego termina.`;
            gameOver = true;
            mostrarGanador();
            document.getElementById('nuevo-juego').style.display = 'inline-block';
            return;
        }

        // Generamos dos números aleatorios entre 1 y 6
        let num1 = Math.floor(Math.random() * 6) + 1;
        let num2 = Math.floor(Math.random() * 6) + 1;

        document.getElementById('status').textContent = `Números generados: ${num1} y ${num2}`;

        // Calculamos la suma de los dos dados
        let suma = num1 + num2;

        // Si la casilla de la suma es 2 y está marcada, se marca la casilla 1
        if (suma === 2 && jugador.numerosMarcados.includes(2)) {
            if (!jugador.numerosMarcados.includes(1)) {
                marcarNumero(1, turnoJugador);
            }
        } else if (!jugador.numerosMarcados.includes(suma)) {
            marcarNumero(suma, turnoJugador);
        }

        // Mostrar los dados visualmente
        mostrarDados(num1, num2);

        // Incrementar intentos del jugador actual
        jugadores[turnoJugador].intentos++;

        // Actualizar la cantidad de intentos restantes
        document.getElementById(`intentos-${turnoJugador}`).textContent = intentosMaximos - jugadores[turnoJugador].intentos;

        // Cambiar de turno
        siguienteJugador();
    }

    // Función para mostrar los dados visualmente
    function mostrarDados(num1, num2) {
        const dadoDisplay = document.getElementById('dado-display');
        dadoDisplay.innerHTML = `
            <div class="dado" data-num="${num1}">${crearPuntosDado(num1)}</div>
            <div class="dado" data-num="${num2}">${crearPuntosDado(num2)}</div>
        `;
    }

    // Crear los puntos para el dado según el número
    function crearPuntosDado(num) {
        let puntos = '';
        for (let i = 0; i < num; i++) {
            puntos += `<div class="punto"></div>`;
        }
        return puntos;
    }

    // Cambiar de turno
    function siguienteJugador() {
        turnoJugador = (turnoJugador + 1) % jugadores.length;
        document.getElementById('turn-indicator').textContent = `Es el turno de ${jugadores[turnoJugador].nombre}`;
    }

    // Verificar el ganador
    function mostrarGanador() {
        let maxCasillasCompletadas = 0;
        let ganadores = [];

        jugadores.forEach((jugador) => {
            if (jugador.numerosMarcados.length > maxCasillasCompletadas) {
                maxCasillasCompletadas = jugador.numerosMarcados.length;
                ganadores = [jugador.nombre]; // Nuevo ganador
            } else if (jugador.numerosMarcados.length === maxCasillasCompletadas) {
                ganadores.push(jugador.nombre); // Empate
            }
        });

        const resultadoElement = document.getElementById('resultado');
        if (ganadores.length > 1) {
            resultadoElement.textContent = ` 🤝EMPATE LOS GANADORES SON 👌: ${ganadores.join(', ')}`;
            resultadoElement.classList.add('empate');
        } else {
            resultadoElement.textContent = `${ganadores[0]} ES EL GANADOR DE LA PARTIDA `;
            resultadoElement.classList.add('victoria');
        }
    }

    // Iniciar un nuevo juego
    function nuevoJuego() {
        let cantidadJugadores = parseInt(prompt("¿Cuántos jugadores participan? (1-4 jugadores)"));
        if (cantidadJugadores >= 1 && cantidadJugadores <= 4) {
            jugadores = [];
            let tableroComun = generarTablero();

            for (let i = 0; i < cantidadJugadores; i++) {
                const nombre = prompt(`Ingresa el nombre del jugador ${i + 1}`);
                jugadores.push({
                    nombre: nombre,
                    tablero: [...tableroComun],
                    numerosMarcados: [],
                    intentos: 0,  // Iniciar con 0 intentos
                });
            }
            gameOver = false;
            turnoJugador = 0;
            mostrarTableros();
            document.getElementById('status').textContent = `Es el turno de ${jugadores[turnoJugador].nombre}`;
            document.getElementById('nuevo-juego').style.display = 'none'; // Ocultar el botón al inicio
            document.getElementById('resultado').textContent = ''; // Limpiar el resultado anterior
            document.getElementById('resultado').classList.remove('empate', 'victoria');
        } else {
            alert('Por favor ingresa un número de jugadores válido.');
        }
    }

    // Asignar eventos
    document.getElementById('btn-generar-numero').addEventListener('click', generarNumero);
    document.getElementById('nuevo-juego').addEventListener('click', nuevoJuego);

    nuevoJuego();
