import './styles.css'
import * as THREE from 'three'
import gsap from 'gsap';
import GUI from 'lil-gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'




// Scene
const scene = new THREE.Scene();
// Camera
const sizes = {
  // measurements to exact screen size (responsive)
  width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
  height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
};

window.addEventListener('resize', (e) => {
  sizes.width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
    sizes.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

})

window.addEventListener('dblclick', () => {
  const fullscreen = document.fullscreenElement || document.webkitFullscreenElement

  if (!fullscreen) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen()
    } else if (canvas.webkitFullscreenElement) {
      canvas.webkitRequestFullscreen()
    }
    // console.log('go fullscreen')
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
    // console.log('leave fullscreen')

  }
})

const aspectRatio = sizes.width / sizes.height
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1, 1 * aspectRatio, -1, 0.1, 100);


const geometry = new THREE.BoxGeometry()

// const count = 50
// const positionsArray = new Float32Array(count * 3 * 3)

// for (let i = 0; i < count * 3 * 3; i++) {
//   positionsArray[i] = Math.random() - 0.5
// }

// const positionsAttr = new THREE.BufferAttribute(positionsArray, 3)
// geometry.setAttribute('position', positionsAttr)


const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true
});



// const mesh = new THREE.Mesh(geometry, material);

const canvas = document.querySelector('.webgl');

// const axisHelper = new THREE.AxesHelper(3)

const renderer = new THREE.WebGLRenderer({
  canvas
});


// const group = new THREE.Group()
const cube = new THREE.Mesh(
  geometry,
  material
)

// group.add(cube)

// const cube2 = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial(material)
// )

// group.add(cube2)

// const cube3 = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial(material)
// )

const clock = new THREE.Clock()

// Cursor

const cursor = {
  x: 0,
  y: 0
}


// Orbit Controls

const orbitControls = new OrbitControls(camera, canvas)
orbitControls.enableDamping = true


window.addEventListener('mousemove', (event) => {
  cursor.x = -(event.clientX / sizes.width - 0.5)
  cursor.y = (event.clientY / sizes.height - 0.5)

  // console.log('cursor.x', cursor.x, 'cursor.y', cursor.y)
})

// cube3.position.x = 2

// group.add(cube3)
// group.position.y = 0
camera.position.set(0, 0, 3)

// mesh.scale.set(1, 1, 1)
// mesh.position.set(0.7, -0.6, 0.3)
// mesh.rotation.reorder('YXZ')
// mesh.rotation.x = Math.PI * 0.25
// mesh.rotation.y = Math.PI * 0.25
// camera.lookAt(mesh.position)

// scene.add(axisHelper)
scene.add(camera);
scene.add(cube)

// **** //
// Debug
// **** //
console.log(cube)
const gui = new GUI({ width: 400 });
// hide GUI dashboard
window.addEventListener('keydown', (event) => {
  if (event.key === 'h') {
    if (gui._hidden) {
      gui.show()
    } else {
      gui.hide()
    }
  }
})

const parameters = {
  spin: () => {
    gsap.to(cube.rotation, { y: cube.rotation.y + 10, duration: 1 })
  }
}

gui
  .add(cube.position, 'y')
  .step(0.01)
  .min(-3)
  .max(3)
  .name('Up/Down')

  gui
  .add(cube.position, 'x')
  .step(0.01)
  .min(-3)
  .max(3)
  .name('Left/Right')

  gui
  .add(cube.position, 'z')
  .step(0.01)
  .min(-3)
  .max(3)
  .name('In/Out')

gui
  .add(cube, 'visible')
  .name('Visible')

gui
  .add(cube.material, 'wireframe')
  .name('Wireframe')

gui
  .addColor(cube.material, 'color')
  .name('Color')

gui
  .add(parameters, 'spin')
// scene.add(mesh);

renderer.setSize(sizes.width, sizes.height);



// let time = Date.now();

// gsap.to(cube.position, { duration: 1, x: 2, delay: 1 })
// gsap.to(cube.position, { duration: 2, x: 0, delay: 2 })


const anim = () => {
  // animation based on real time and NOT framerate
  // const currentTime = Date.now();
  // const deltaTime = currentTime - time;
  // time = currentTime
  // const timeElapsed = clock.getElapsedTime();
  // console.log(timeElapsed)
  // cube.rotation.y = Math.sin(timeElapsed)
  // cube.position.x = Math.cos(timeElapsed)
  // cube.rotation.z = Math.sqrt(timeElapsed)
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
  // camera.position.y = Math.cos(cursor.y * Math.PI * 2) * 3

  orbitControls.update()
  // camera.lookAt(cube.position)


  // request animation per frame rate
  renderer.render(scene, camera);

  window.requestAnimationFrame(anim)
}

anim()