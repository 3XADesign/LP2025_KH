let jugadores = [];
        let dealer = { nombre: "Dealer", puntaje: 0 };

        function iniciarBlackjack() {
            let numJugadores = parseInt(document.getElementById("numJugadores").value);
            jugadores = [];
            dealer.puntaje = 0;
            let jugadoresDiv = document.getElementById("jugadores");
            let dealerDiv = document.getElementById("dealer");
            jugadoresDiv.innerHTML = "";
            dealerDiv.innerHTML = `<p class='text-warning'><strong>${dealer.nombre}</strong>: <span id='puntaje-dealer'>${dealer.puntaje}</span> puntos</p>`;
            
            for (let i = 0; i < numJugadores; i++) {
                jugadores.push({ nombre: `Jugador ${i + 1}`, puntaje: 0, plantado: false });
                let jugadorDiv = document.createElement("div");
                jugadorDiv.id = `jugador-${i}`;
                jugadorDiv.innerHTML = `<p class='text-light'><strong>${jugadores[i].nombre}</strong>: <span id='puntaje-${i}'>${jugadores[i].puntaje}</span> puntos</p>
                <button class='btn btn-primary btn-sm' onclick='pedirDado(${i})'>➕ Pedir</button>
                <button class='btn btn-danger btn-sm' onclick='plantarse(${i})'>✋ Plantarse</button>`;
                jugadoresDiv.appendChild(jugadorDiv);
            }
        }

        function lanzarDosDados() {
            return Math.floor(Math.random() * 6) + 1;
        }

        function mostrarDados(dado1, dado2) {
            let dadosContainer = document.getElementById("dados-centro");
            dadosContainer.innerHTML = `
                <div class="dado">
                    <div class="puntos">
                        ${generarPuntos(dado1)}
                    </div>
                </div>
                <div class="dado">
                    <div class="puntos">
                        ${generarPuntos(dado2)}
                    </div>
                </div>
            `;

            // Activar los puntos correspondientes para cada dado
            setTimeout(() => {
                activarPuntos(dadosContainer.children[0], dado1);
                activarPuntos(dadosContainer.children[1], dado2);
            }, 0);
        }

        function generarPuntos(valor) {
            let puntosHTML = "";
            for (let i = 1; i <= 9; i++) {
                puntosHTML += `<div class="punto punto-${i}"></div>`;
            }
            return puntosHTML;
        }

        function activarPuntos(dadoElement, valor) {
            let puntos = dadoElement.querySelectorAll(".punto");
            puntos.forEach(p => p.style.opacity = 0); // Reiniciar todos los puntos
        
            switch (valor) {
                case 1:
                    dadoElement.querySelector(".punto-5").style.opacity = 1;
                    break;
                case 2:
                    dadoElement.querySelector(".punto-1").style.opacity = 1;
                    dadoElement.querySelector(".punto-9").style.opacity = 1;
                    break;
                case 3:
                    dadoElement.querySelector(".punto-1").style.opacity = 1;
                    dadoElement.querySelector(".punto-5").style.opacity = 1;
                    dadoElement.querySelector(".punto-9").style.opacity = 1;
                    break;
                case 4:
                    dadoElement.querySelector(".punto-1").style.opacity = 1;
                    dadoElement.querySelector(".punto-3").style.opacity = 1;
                    dadoElement.querySelector(".punto-7").style.opacity = 1;
                    dadoElement.querySelector(".punto-9").style.opacity = 1;
                    break;
                case 5:
                    dadoElement.querySelector(".punto-1").style.opacity = 1;
                    dadoElement.querySelector(".punto-3").style.opacity = 1;
                    dadoElement.querySelector(".punto-5").style.opacity = 1;
                    dadoElement.querySelector(".punto-7").style.opacity = 1;
                    dadoElement.querySelector(".punto-9").style.opacity = 1;
                    break;
                case 6:
                    dadoElement.querySelector(".punto-1").style.opacity = 1;
                    dadoElement.querySelector(".punto-3").style.opacity = 1;
                    dadoElement.querySelector(".punto-4").style.opacity = 1;
                    dadoElement.querySelector(".punto-6").style.opacity = 1;
                    dadoElement.querySelector(".punto-7").style.opacity = 1;
                    dadoElement.querySelector(".punto-9").style.opacity = 1;
                    break;
            }
        }

        function pedirDado(jugadorIndex) {
            if (jugadores[jugadorIndex].plantado) return;

            let dado1 = lanzarDosDados();
            let dado2 = lanzarDosDados();
            let suma = dado1 + dado2;

            mostrarDados(dado1, dado2);
            jugadores[jugadorIndex].puntaje += suma;
            document.getElementById(`puntaje-${jugadorIndex}`).textContent = jugadores[jugadorIndex].puntaje;

            if (jugadores[jugadorIndex].puntaje > 21) {
                document.getElementById(`jugador-${jugadorIndex}`).innerHTML += " <span class='text-danger'>💥 Eliminado</span>";
                jugadores[jugadorIndex].plantado = true;
            }
            verificarFinJuego();
        }

        function plantarse(jugadorIndex) {
            jugadores[jugadorIndex].plantado = true;
            document.getElementById(`jugador-${jugadorIndex}`).innerHTML += " <span class='text-success'>✔️ Plantado</span>";
            verificarFinJuego();
        }

        function verificarFinJuego() {
            if (jugadores.every(j => j.plantado || j.puntaje > 21)) {
                turnoDealer();
            }
        }

        function turnoDealer() {
            let dealerPuntajeSpan = document.getElementById("puntaje-dealer");
            while (dealer.puntaje < 17) {
                dealer.puntaje += lanzarDosDados();
                dealerPuntajeSpan.textContent = dealer.puntaje;
            }
            if (dealer.puntaje > 21) {
                document.getElementById("dealer").innerHTML += " <span class='text-danger'>💥 Dealer Eliminado</span>";
            }
            verificarGanador();
        }

        function verificarGanador() {
            let jugadoresValidos = jugadores.filter(j => j.puntaje <= 21);
            let dealerValido = dealer.puntaje <= 21;
            let jugadoresEmpatados = jugadoresValidos.filter(j => j.puntaje === dealer.puntaje);

            let mensaje = "";
            if (jugadoresEmpatados.length > 0) {
                mensaje = `🤝 Empate entre el Dealer y ${jugadoresEmpatados.map(j => j.nombre).join(", ")} con ${dealer.puntaje} puntos!`;
            } else if (dealerValido && (!jugadoresValidos.length || dealer.puntaje > Math.max(...jugadoresValidos.map(j => j.puntaje)))) {
                mensaje = "🏆 El Dealer gana con " + dealer.puntaje + " puntos!";
            } else {
                let ganador = jugadoresValidos.sort((a, b) => b.puntaje - a.puntaje)[0];
                mensaje = `🏆 Ganador: ${ganador.nombre} con ${ganador.puntaje} puntos!`;
            }
            document.getElementById("resultadoBlackjack").textContent = mensaje;
        }
