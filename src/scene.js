import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { EXRLoader } from 'three/addons/loaders/EXRLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Create loading manager
const loadingManager = new THREE.LoadingManager();
const progressBar = document.createElement('div');
const progressBarContainer = document.createElement('div');
const loadingScreen = document.createElement('div');

// Set up loading screen
function setupLoadingScreen() {
    // Style loading screen
    loadingScreen.style.position = 'fixed';
    loadingScreen.style.top = '0';
    loadingScreen.style.left = '0';
    loadingScreen.style.width = '100%';
    loadingScreen.style.height = '100%';
    loadingScreen.style.background = '#000000';
    loadingScreen.style.display = 'flex';
    loadingScreen.style.justifyContent = 'center';
    loadingScreen.style.alignItems = 'center';
    loadingScreen.style.zIndex = '1000';
    
    // Style progress bar container
    progressBarContainer.style.width = '30%';
    progressBarContainer.style.height = '2px';
    progressBarContainer.style.background = '#333333';
    
    // Style progress bar
    progressBar.style.width = '0%';
    progressBar.style.height = '100%';
    progressBar.style.background = '#ffffff';
    progressBar.style.transition = 'width 0.1s';
    
    // Assemble elements
    progressBarContainer.appendChild(progressBar);
    loadingScreen.appendChild(progressBarContainer);
    document.body.appendChild(loadingScreen);
}

// Configure loading manager
loadingManager.onProgress = function(url, loaded, total) {
    const progress = (loaded / total) * 100;
    progressBar.style.width = progress + '%';
};

loadingManager.onLoad = function() {
    // Fade out loading screen
    loadingScreen.style.transition = 'opacity 0.5s';
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
        loadingScreen.remove();
    }, 500);
};

export function initScene() {
    setupLoadingScreen();
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(5, 5, -5);

    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#bg'),
        antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Update loaders to use loadingManager
    const exrLoader = new EXRLoader(loadingManager);
    exrLoader.load('/The_Classic_Gentlemens_Den/neon_photostudio_4k.exr', function(texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.background = texture;
        scene.environment = texture;
    });

    // Lighting setup
    function createLight(x, y, z, intensity = 30) {
        const light = new THREE.PointLight(0xffee88, intensity, 100, 2);
        light.position.set(x, y, z);
        light.castShadow = true;
        return light;
    }

    const lights = [];
    const radius = 4;
    const numberOfLights = 4;
    const baseHeight = 3;

    for (let i = 0; i < numberOfLights; i++) {
        const angle = (i / numberOfLights) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const light = createLight(x, baseHeight, z);
        lights.push(light);
        scene.add(light);
    }

    const topLight = createLight(0, baseHeight + 2, 0, 20);
    lights.push(topLight);
    scene.add(topLight);

    const hemiLight = new THREE.HemisphereLight(0xddeeff, 0x0f0e0d, 0.1);
    scene.add(hemiLight);

    // Update GLTF loader to use loadingManager
    const loader = new GLTFLoader(loadingManager);
    loader.load(
        '/The_Classic_Gentlemens_Den/old_barber_chair/scene.gltf',
        function (gltf) {
            const model = gltf.scene;
            
            model.traverse((node) => {
                if (node.isMesh) {
                    node.castShadow = true;
                    node.receiveShadow = true;
                }
            });
    
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            model.position.sub(center);
            
            model.position.y = 1;
            scene.add(model);
    
            function animateModel() {
                model.rotation.y += 0.01;
                requestAnimationFrame(animateModel);
            }
            animateModel();
        }
    );

    // Orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 2, 0);
    controls.update();

    // Window resize handling
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Animation
    let animationStartTime = null;
    const animationDuration = 2000;

    function animate(currentTime) {
        if (currentTime === undefined) {
            requestAnimationFrame(animate);
            return;
        }
        
        if (animationStartTime === null) {
            animationStartTime = currentTime;
        }
    
        const elapsed = currentTime - animationStartTime;
        const progress = Math.min(elapsed / animationDuration, 1);
    
        if (progress < 1) {
            lights.forEach((light) => {
                const easeOut = 1 - Math.pow(1 - progress, 2);
                light.position.y = baseHeight - 0.75 + (1.5 * easeOut);
            });
        }
        
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

    animate();
}
