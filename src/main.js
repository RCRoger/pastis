import './styles/main.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Cake from './components/Cake.js';
import Topping from './components/Topping.js';
import en from './lang/en.json';
import es from './lang/es.json';
import ca from './lang/ca.json';

let scene, camera, renderer, controls, cake, toppingsGroup, resizeObserver;
let lang = ca; // Default language is now Catalan

function init() {
    scene = new THREE.Scene();
    const stageColor = 0xf5f2ec;
    scene.background = new THREE.Color(stageColor);

    camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(stageColor);
    const canvasContainer = document.getElementById('canvas-container');
    renderer.domElement.setAttribute('aria-hidden', 'true');
    canvasContainer.appendChild(renderer.domElement);

    const resizeCanvas = () => {
        const { clientWidth, clientHeight } = canvasContainer;
        if (!clientWidth || !clientHeight) return;

        renderer.setSize(clientWidth, clientHeight);
        camera.aspect = clientWidth / clientHeight;
        camera.updateProjectionMatrix();
    };
    resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvasContainer);
    resizeCanvas();

    // Add OrbitControls for camera movement
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Smooth camera movement
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 2; // Minimum zoom distance
    controls.maxDistance = 10; // Maximum zoom distance

    // Add lighting
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(10, 10, 10);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040); // Soft ambient light
    scene.add(ambientLight);

    // Create and add the cake component
    cake = new Cake(scene);
    cake.create('medium', 1); // Default size is medium with 1 layer

    // Initialize toppings group
    toppingsGroup = new THREE.Group();
    scene.add(toppingsGroup);

    camera.position.z = 5;
    camera.position.y = 2; // Adjust the camera height
    camera.lookAt(0, 0, 0); // Ensure the camera looks at the center of the scene

    // Add event listeners for menu interactions
    document.getElementById('cake-color').addEventListener('input', (event) => {
        const color = event.target.value;
        cake.getBaseLayers().forEach(base => base.material.color.set(color));
    });

    document.getElementById('frosting-color').addEventListener('input', (event) => {
        const color = event.target.value;
        cake.getFrosting().material.color.set(color);
    });

    document.getElementById('cream-color').addEventListener('input', (event) => {
        const color = event.target.value;
        cake.getCreamLayers().forEach(cream => cream.material.color.set(color));
    });

    document.getElementById('chocolate-color').addEventListener('input', (event) => {
        const color = event.target.value;
        cake.getChocolateLayers().forEach(chocolate => chocolate.material.color.set(color));
    });

    document.getElementById('cake-size').addEventListener('change', (event) => {
        const size = event.target.value;
        const numLayers = parseInt(document.getElementById('num-layers').value, 10) || 3;
        cake.create(size, numLayers);
        updateToppings(); // Update toppings positions after resizing the cake
    });

    document.getElementById('num-layers').addEventListener('input', (event) => {
        const numLayers = parseInt(event.target.value, 10) || 3;
        const size = document.getElementById('cake-size').value;
        cake.create(size, numLayers);
        updateToppings(); // Update toppings positions after changing the number of layers
    });

    // Add event listener for toppings multi-select
    document.getElementById('toppings-select').addEventListener('change', updateToppings);

    animate();
}

function updateToppings() {
    // Clear existing toppings
    while (toppingsGroup.children.length > 0) {
        toppingsGroup.remove(toppingsGroup.children[0]);
    }

    // Calculate the top Y position of the cake
    const cakeHeight = cake.getTotalHeight();
    const toppingYPosition = cakeHeight + 0.1; // Add a small offset above the cake
    const radius = cake.getTopRadius() - 0.3; // Adjust radius for toppings placement

    // Get selected toppings
    const selectedToppings = Array.from(document.getElementById('toppings-select').selectedOptions).map(option => option.value);

    // Add cherries if selected
    if (selectedToppings.includes('cherry')) {
        const cherryCount = 8; // Number of cherries to place around the perimeter
        for (let i = 0; i < cherryCount; i++) {
            const angle = (i / cherryCount) * Math.PI * 2; // Calculate angle for each cherry
            const x = radius * Math.cos(angle);
            const z = radius * Math.sin(angle);

            const cherry = new Topping('cherry', {
                texturePath: './assets/cherry.png',
                count: 1,
                scale: { x: 0.5, y: 0.5, z: 1 },
                position: { x, y: toppingYPosition, z },
            });
            toppingsGroup.add(cherry.getGroup());
        }
    }

    // Add strawberries if selected
    if (selectedToppings.includes('strawberry')) {
        const strawberryCount = 6; // Number of strawberries to place around the perimeter
        for (let i = 0; i < strawberryCount; i++) {
            const angle = (i / strawberryCount) * Math.PI * 2; // Calculate angle for each strawberry
            const x = radius * Math.cos(angle);
            const z = radius * Math.sin(angle);

            const strawberry = new Topping('strawberry', {
                texturePath: './assets/strawberry.png',
                count: 1,
                scale: { x: 0.4, y: 0.4, z: 1 },
                position: { x, y: toppingYPosition, z },
            });
            toppingsGroup.add(strawberry.getGroup());
        }
    }

    // Add sprinkles if selected
    if (selectedToppings.includes('sprinkles')) {
        const sprinkles = new Topping('sprinkles', {
            texturePath: './assets/sprinkles.png',
            count: 20,
            scale: { x: 0.1, y: 0.1, z: 1 },
            position: { y: toppingYPosition },
            randomize: true,
        });
        toppingsGroup.add(sprinkles.getGroup());
    }

    // Add birthday topping if selected
    if (selectedToppings.includes('birthday')) {
        const birthday = new Topping('birthday', {
            texturePath: './assets/birthday.png',
            count: 1,
            scale: { x: 1, y: 1, z: 1 },
            position: { x: 0, y: cakeHeight, z: 0 }, // Position on the same plane as the top base
        });
        toppingsGroup.add(birthday.getGroup());
    }
}

function setLanguage(language) {
    if (language === 'es') lang = es;
    else if (language === 'en') lang = en;
    else {
        language = 'ca';
        lang = ca;
    }

    document.documentElement.lang = language;
    updateText();
}

function updateText() {
    document.title = lang.title;
    document.querySelectorAll('[data-i18n]').forEach((element) => {
        element.textContent = lang[element.dataset.i18n];
    });

    const sizeSelect = document.getElementById('cake-size');
    sizeSelect.options[0].textContent = lang.small;
    sizeSelect.options[1].textContent = lang.medium;
    sizeSelect.options[2].textContent = lang.large;

    const toppingsSelect = document.getElementById('toppings-select');
    Array.from(toppingsSelect.options).forEach((option) => {
        option.textContent = lang[option.value];
    });
    document.getElementById('canvas-container').setAttribute('aria-label', lang.previewCanvas);
}

document.addEventListener('DOMContentLoaded', () => {
    const languageSelector = document.getElementById('language-selector');
    languageSelector.addEventListener('change', (event) => setLanguage(event.target.value));
    setLanguage(languageSelector.value);
});

function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Update OrbitControls
    renderer.render(scene, camera);
}

window.onload = init;