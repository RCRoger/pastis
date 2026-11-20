import * as THREE from 'three';
import BaseCake from './BaseCake.js';

const RADIAL_SEGMENTS = 128; // Global parameter for radial segments
const GINGERBREAD_TEXTURE = './assets/capaPastis.png'; // Path to gingerbread texture

class Cake {
    constructor(scene) {
        this.scene = scene;
        this.layers = []; // Store all layers (base and cream)
        this.frosting = null;
    }

    create(size, numLayers = 1) { // Default number of layers is now 1
        // Remove existing cake components
        this.layers.forEach(layer => this.scene.remove(layer));
        this.layers = [];
        this.baseLayers = [];
        this.creamLayers = [];
        this.chocolateLayers = []; // Store chocolate layers
        if (this.frosting) this.scene.remove(this.frosting);
        const frostingHeight = 0.01; // Default frosting height
        let radius, layerHeight, creamHeight, creamRadius;

        // Set dimensions based on size
        if (size === 'small') {
            radius = 1.5;
            layerHeight = 0.2;
            creamRadius = 1.48; // Slightly smaller than the base radius
        } else if (size === 'medium') {
            radius = 2;
            layerHeight = 0.25;
            creamRadius = 1.98; // Slightly smaller than the base radius
        } else if (size === 'large') {
            radius = 2.5;
            layerHeight = 0.3;
            creamRadius = 2.48; // Slightly smaller than the base radius
        }

        creamHeight = layerHeight / 2; // Cream layer height is half of the base layer height

        // Create alternating layers of base cake, cream, and chocolate
        let currentHeight = 0;
        for (let i = 0; i < numLayers; i++) {
            // Add base cake layer with gingerbread texture
            const baseCake = new BaseCake(radius, layerHeight, RADIAL_SEGMENTS, 0xD2691E, GINGERBREAD_TEXTURE);
            const baseMesh = baseCake.getMesh();
            baseMesh.position.y = currentHeight + layerHeight / 2; // Position base layer
            this.scene.add(baseMesh);
            this.layers.push(baseMesh);
            this.baseLayers.push(baseMesh); // Store base layer
            currentHeight += layerHeight;

            // Add cream layer
            const creamGeometry = new THREE.CylinderGeometry(creamRadius, creamRadius, creamHeight, RADIAL_SEGMENTS);
            const creamMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFDD0 }); // Default cream color
            const creamMesh = new THREE.Mesh(creamGeometry, creamMaterial);
            creamMesh.position.y = currentHeight + creamHeight / 2; // Position cream layer
            this.scene.add(creamMesh);
            this.layers.push(creamMesh);
            this.creamLayers.push(creamMesh); // Store cream layer
            currentHeight += creamHeight;

            // Add chocolate layer
            const chocolateGeometry = new THREE.CylinderGeometry(creamRadius, creamRadius, creamHeight, RADIAL_SEGMENTS);
            const chocolateMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 }); // Chocolate color
            const chocolateMesh = new THREE.Mesh(chocolateGeometry, chocolateMaterial);
            chocolateMesh.position.y = currentHeight + creamHeight / 2; // Position chocolate layer
            this.scene.add(chocolateMesh);
            this.layers.push(chocolateMesh);
            this.chocolateLayers.push(chocolateMesh); // Store chocolate layer
            currentHeight += creamHeight;
        }

        // Add base cake layer with gingerbread texture
        const baseCake = new BaseCake(radius, layerHeight, RADIAL_SEGMENTS, 0xD2691E, GINGERBREAD_TEXTURE);
        const baseMesh = baseCake.getMesh();
        baseMesh.position.y = currentHeight + layerHeight / 2; // Position base layer
        this.scene.add(baseMesh);
        this.layers.push(baseMesh);
        this.baseLayers.push(baseMesh); // Store base layer
        currentHeight += layerHeight;

        // Create and add the frosting layer
        const frostingTexturePath = './assets/capaFroast.png'; // Path to frosting texture
        const textureLoader = new THREE.TextureLoader();
        const frostingTexture = textureLoader.load(frostingTexturePath);
        const frostingGeometry = new THREE.CylinderGeometry(radius, radius, frostingHeight, RADIAL_SEGMENTS);
        const frostingMaterial = new THREE.MeshBasicMaterial({ map: frostingTexture, color: 0xFFFFFF }); // Default frosting color is white
        this.frosting = new THREE.Mesh(frostingGeometry, frostingMaterial);
        this.frosting.position.y = currentHeight + frostingHeight / 2; // Position frosting on top
        this.scene.add(this.frosting);
    }

    getBaseLayers() {
        return this.baseLayers; // Return only base layers
    }

    getCreamLayers() {
        return this.creamLayers; // Return only cream layers
    }

    getChocolateLayers() {
        return this.chocolateLayers; // Return only chocolate layers
    }

    getFrosting() {
        return this.frosting;
    }

    getTotalHeight() {
        let totalHeight = 0;
        this.layers.forEach(layer => {
            totalHeight += layer.geometry.parameters.height;
        });
        if (this.frosting) {
            totalHeight += this.frosting.geometry.parameters.height;
        }
        return totalHeight;
    }

    getTopRadius() {
        if (this.layers.length > 0) {
            const topLayer = this.layers[this.layers.length - 1];
            return topLayer.geometry.parameters.radiusTop || topLayer.geometry.parameters.radius;
        }
        return 0;
    }
}

export default Cake;