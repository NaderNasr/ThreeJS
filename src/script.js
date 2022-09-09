/* eslint-disable no-undef */

// Scene
const scene = new THREE.Scene();
// Camera
const sizes = {
  // measurements to exact screen size (responsive)
  width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
  height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
const geometry = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

const mesh = new THREE.Mesh(geometry, material);

const canvas = document.querySelector('.webgl');
console.log(camera);
const renderer = new THREE.WebGLRenderer({
  canvas
});
camera.position.z = 3;
// camera.position.x = 1;
// camera.position.y = 1;

scene.add(camera);
scene.add(mesh);

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);