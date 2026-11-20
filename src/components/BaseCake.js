import * as THREE from 'three';

class BaseCake {
    constructor(radius, height, radialSegments, color = 0xD2691E, texturePath = null) {
        const geometry = new THREE.CylinderGeometry(radius, radius, height, radialSegments);

        let material;
        if (texturePath) {
            const textureLoader = new THREE.TextureLoader();
            const texture = textureLoader.load(texturePath);
            material = new THREE.MeshBasicMaterial({ map: texture });
        } else {
            material = new THREE.MeshBasicMaterial({ color: 0xD2691E }); // Default base cake color
        }

        this.mesh = new THREE.Mesh(geometry, material);
    }

    getMesh() {
        return this.mesh;
    }
}

export default BaseCake;
