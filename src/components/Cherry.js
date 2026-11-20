import * as THREE from 'three';

class Cherry {
    constructor(texturePath = './assets/cherry.png') {
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(texturePath);
        const material = new THREE.SpriteMaterial({ map: texture });
        this.sprite = new THREE.Sprite(material);
        this.sprite.scale.set(0.5, 0.5, 1); // Adjust size of the sprite
        this.sprite.position.y = 1.25; // Default position on top of the frosting
    }

    getSprite() {
        return this.sprite;
    }
}

export default Cherry;
