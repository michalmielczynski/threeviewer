import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'lil-gui';
import './style.css';

const viewer = document.getElementById('viewer');
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(viewer.clientWidth, viewer.clientHeight);
viewer.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202025);

const camera = new THREE.PerspectiveCamera(60, viewer.clientWidth / viewer.clientHeight, 0.1, 100);
camera.position.set(3, 3, 3);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const geometry = new THREE.TorusKnotGeometry(1, 0.3, 128, 32);
const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
const knot = new THREE.Mesh(geometry, material);
scene.add(knot);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 5, 5);
scene.add(dirLight);
scene.add(new THREE.AmbientLight(0xffffff, 0.5));

const gui = new GUI();
const params = { speed: 0.01, color: material.color.getHex() };
gui.addColor(params, 'color').onChange((v) => material.color.setHex(v));
gui.add(params, 'speed', 0, 0.1, 0.001);

window.addEventListener('resize', onWindowResize);
function onWindowResize() {
  const width = viewer.clientWidth;
  const height = viewer.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

onWindowResize();

function animate() {
  requestAnimationFrame(animate);
  knot.rotation.x += params.speed;
  knot.rotation.y += params.speed;
  controls.update();
  renderer.render(scene, camera);
}

animate();
