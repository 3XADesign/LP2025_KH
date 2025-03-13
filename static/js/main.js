// main.js - Inicializa la escena y maneja eventos

let scene, camera, renderer, dice;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    dice = new Dice(scene);
    camera.position.z = 5;
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

function lanzarDados() {
    dice.roll();
}

document.addEventListener("click", lanzarDados);
window.onload = init;