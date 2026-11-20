import * as THREE from 'three';

class Topping {
    constructor(type, options = {}) {
        this.type = type;
        this.group = new THREE.Group();

        const defaultOptions = {
            texturePath: '',
            count: 1,
            scale: { x: 0.5, y: 0.5, z: 1 },
            position: { x: 0, y: 1.3, z: 0 },
            randomize: false,
        };

        this.options = { ...defaultOptions, ...options };

        if (this.type === 'sprinkles') {
            this.createSprinkles();
        } else if (this.type === 'birthday') {
            this.createBirthdayTopping();
        } else {
            this.createSingleTopping();
        }
    }

    createSingleTopping() {
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(this.options.texturePath);
        const material = new THREE.SpriteMaterial({ map: texture });

        for (let i = 0; i < this.options.count; i++) {
            const sprite = new THREE.Sprite(material);
            sprite.scale.set(this.options.scale.x, this.options.scale.y, this.options.scale.z);

            if (this.options.randomize) {
                sprite.position.set(
                    (Math.random() - 0.5) * 2,
                    this.options.position.y,
                    (Math.random() - 0.5) * 2
                );
            } else {
                sprite.position.set(this.options.position.x, this.options.position.y, this.options.position.z);
            }

            this.group.add(sprite);
        }
    }

    createSprinkles() {
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(this.options.texturePath);

        for (let i = 0; i < this.options.count; i++) {
            const material = new THREE.SpriteMaterial({ map: texture });
            const sprinkle = new THREE.Sprite(material);
            sprinkle.scale.set(this.options.scale.x, this.options.scale.y, this.options.scale.z);
            sprinkle.position.set(
                (Math.random() - 0.5) * 2, // Random x position
                this.options.position.y, // Adjusted y position
                (Math.random() - 0.5) * 2 // Random z position
            );
            this.group.add(sprinkle);
        }
    }

    createBirthdayTopping() {
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(this.options.texturePath);
        const material = new THREE.SpriteMaterial({ map: texture });

        for (let i = 0; i < this.options.count; i++) {
            const sprite = new THREE.Sprite(material);
            sprite.scale.set(this.options.scale.x, this.options.scale.y, this.options.scale.z);
            sprite.position.set(
                this.options.position.x, // Fixed x position
                this.options.position.y, // Same y position as the top base
                this.options.position.z // Fixed z position
            );
            this.group.add(sprite);
        }
    }

    getGroup() {
        return this.group;
    }
}

export default Topping;
