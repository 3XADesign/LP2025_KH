// dice.js - Maneja la lógica del dado 3D

class Dice {
    constructor(scene) {
        this.loader = new THREE.TextureLoader();
        this.materials = this.createMaterials();
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.mesh = new THREE.Mesh(this.geometry, this.materials);
        scene.add(this.mesh);
    }

    createMaterials() {
        return [
            new THREE.MeshBasicMaterial({ map: this.loader.load('cara1.png') }),
            new THREE.MeshBasicMaterial({ map: this.loader.load('cara2.png') }),
            new THREE.MeshBasicMaterial({ map: this.loader.load('cara3.png') }),
            new THREE.MeshBasicMaterial({ map: this.loader.load('cara4.png') }),
            new THREE.MeshBasicMaterial({ map: this.loader.load('cara5.png') }),
            new THREE.MeshBasicMaterial({ map: this.loader.load('cara6.png') })
        ];
    }

    roll() {
        let xRotation = Math.PI * (1 + Math.floor(Math.random() * 4));
        let yRotation = Math.PI * (1 + Math.floor(Math.random() * 4));
        
        let frame = 0;
        let totalFrames = 60;
        let startX = this.mesh.rotation.x;
        let startY = this.mesh.rotation.y;
        
        let interval = setInterval(() => {
            if (frame >= totalFrames) {
                clearInterval(interval);
                let result = Math.ceil(Math.random() * 6);
                guardarHistorial(result);
                console.log("Resultado: ", result);
            } else {
                frame++;
                this.mesh.rotation.x = startX + (xRotation - startX) * (frame / totalFrames);
                this.mesh.rotation.y = startY + (yRotation - startY) * (frame / totalFrames);
            }
        }, 16);
    }
}