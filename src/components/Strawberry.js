import * as THREE from 'three';

class Strawberry {
    constructor(texturePath = './assets/strawberry.png') {
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(texturePath);
        const material = new THREE.SpriteMaterial({ map: texture });
        this.sprite = new THREE.Sprite(material);
        this.sprite.scale.set(0.4, 0.4, 1); // Adjust size of the sprite
        this.sprite.position.y = 1.3; // Default position on top of the frosting
    }

    getSprite() {
        return this.sprite;
    }
}

export default Strawberry;
