import './styles.css'
import * as THREE from 'three'
import gsap from 'gsap';
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

// group.add(cube2)

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial(material)
)

cube3.position.x = 2

// group.add(cube3)
group.position.y = 0
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


const clock = new THREE.Clock()

// let time = Date.now();

gsap.to(cube1.position, { duration: 1, x: 2, delay: 1 })
gsap.to(cube1.position, { duration: 2, x: 0, delay: 2 })


const anim = () => {
  // animation based on real time and NOT framerate
  // const currentTime = Date.now();
  // const deltaTime = currentTime - time;
  // time = currentTime
  const timeElapsed = clock.getElapsedTime();
  // console.log(timeElapsed)
  cube1.rotation.y = Math.sin(timeElapsed)
  // cube1.position.x = Math.cos(timeElapsed)
  // cube1.rotation.z = Math.sqrt(timeElapsed)

  camera.lookAt(cube1.position)


  // request animation per frame rate
  renderer.render(scene, camera);

  window.requestAnimationFrame(anim)
}

anim()