import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import * as dat from "dat.gui";
import gsap from "gsap";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const gltfloader = new GLTFLoader();

// Debug
// const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

let tl = gsap.timeline();

// Brain
gltfloader.load("brain.gltf", (gltf) => {
	// gltf.scene.scale.set(0, 0, 0);
	// gltf.scene.rotation.set(0, 0, 0);

	scene.add(gltf.scene);

	gui.add(gltf.scene.rotation, "x").min(0).max(9);
	gui.add(gltf.scene.rotation, "y").min(0).max(9);
	gui.add(gltf.scene.rotation, "z").min(0).max(9);

	// tl.to(gltf.scene.rotation, { y: 5.1, duration: 1 });
	// tl.to(gltf.scene.scale, { x: 0.2, y: 0.2, z: 0.2, duration: 1 }, "-=1");
});

// Lights

// const pointLight = new THREE.PointLight(0xeb9295, 0.9);
// pointLight.position.x = 2;
// pointLight.position.y = 3;
// pointLight.position.z = 4;
// scene.add(pointLight);

const lights = [];
const lightHelpers = [];

const lightValues = [
	{ colour: 0xeb9295, intensity: 1, dist: 12, x: 1, y: 0, z: 8 },
	{ colour: 0xeb9295, intensity: 1, dist: 12, x: -2, y: 1, z: -10 },
	{ colour: 0xbb534d, intensity: 5, dist: 10, x: 2, y: 10, z: 1 },
	{ colour: 0xbb534d, intensity: 3, dist: 12, x: 0, y: -10, z: -1 },
	{ colour: 0xbb534d, intensity: 5, dist: 12, x: 10, y: 3, z: 0 },
	{ colour: 0xbb534d, intensity: 5, dist: 12, x: -10, y: -1, z: 0 },
];

for (let i = 0; i < lightValues.length; i++) {
	lights[i] = new THREE.PointLight(
		lightValues[i]["colour"],
		lightValues[i]["intensity"],
		lightValues[i]["dist"]
	);
	lights[i].position.set(
		lightValues[i]["x"],
		lightValues[i]["y"],
		lightValues[i]["z"]
	);
	scene.add(lights[i]);

	scene.add(lightHelpers[i]);
}

/**
 * Sizes
 */
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

window.addEventListener("resize", () => {
	// Update sizes
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// Update camera
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// Update renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
	75,
	sizes.width / sizes.height,
	0.6,
	1200
);
camera.position.z = -8;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
	alpha: true,
});
renderer.setClearColor("#181818");
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Trackball Controls for Camera
// const controls = new TrackballControls(camera, renderer.domElement);
// controls.rotateSpeed = 2;
// controls.dynamicDampingFactor = 0.15;

/**
 * Animate
 */

const clock = new THREE.Clock();

const tick = () => {
	const elapsedTime = clock.getElapsedTime();

	// Update objects
	// gltfloader.rotation.y = 0.5 * elapsedTime;

	// Update Orbital Controls
	// controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
