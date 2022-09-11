import './styles.css'
import * as THREE from 'three'
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

// const mesh = new THREE.Mesh(geometry, material);

const canvas = document.querySelector('.webgl');

const axisHelper = new THREE.AxesHelper(3)

const renderer = new THREE.WebGLRenderer({
  canvas
});

const group = new THREE.Group()
const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial(material)
)
group.add(cube1)

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial(material)
)

cube2.position.x = -2

group.add(cube2)

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial(material)
)

cube3.position.x = 2

group.add(cube3)
group.position.y = 1
camera.position.z = 3

// mesh.scale.set(1, 1, 1)
// mesh.position.set(0.7, -0.6, 0.3)
// mesh.rotation.reorder('YXZ')
// mesh.rotation.x = Math.PI * 0.25
// mesh.rotation.y = Math.PI * 0.25
// camera.lookAt(mesh.position)

scene.add(axisHelper)
scene.add(camera);
scene.add(group)

// scene.add(mesh);

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);