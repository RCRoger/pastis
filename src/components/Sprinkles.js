import * as THREE from 'three';

class Sprinkles {
    constructor(count = 20, texturePath = './assets/sprinkles.png') {
        this.group = new THREE.Group();
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(texturePath);

        for (let i = 0; i < count; i++) {
            const material = new THREE.SpriteMaterial({ map: texture });
            const sprinkle = new THREE.Sprite(material);
            sprinkle.scale.set(0.1, 0.1, 1); // Adjust size of the sprite
            sprinkle.position.set(
                (Math.random() - 0.5) * 2, // Random x position
                1.3, // Adjusted y position to be above the frosting
                (Math.random() - 0.5) * 2 // Random z position
            );
            this.group.add(sprinkle);
        }
    }

    getGroup() {
        return this.group;
    }
}

export default Sprinkles;
