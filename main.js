import * as THREE from 'three';
import "./style.css"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import gsap from 'gsap';

//Scene

const scene = new THREE.Scene();

//Create the sphere
const x = 0, y = 0;

const heartShape = new THREE.Shape();

heartShape.moveTo( x + 5, y + 5 );
heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );


const geometry = new THREE.ShapeGeometry(heartShape);

const material = new THREE.MeshBasicMaterial({
  color:'#FF0000',
  roughness: 0.5
})

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh)

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

//Light
const light = new THREE.PointLight(0xffffff, 1, 50)
light.position.z = 5
light.intensity = 1
scene.add(light)

//Camera
const camera = new THREE.PerspectiveCamera(60, sizes.width/ sizes.height, 0.1, 100)
camera.position.z = 65
scene.add(camera)


//Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(2);
renderer.render(scene, camera)

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 60


//Resize
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
})

const loop = () => {
  controls.update()
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop)
}
 
loop()

//Timeline 

const tl = gsap.timeline({defaults: {duration: 1 }})
tl.fromTo(mesh.scale, {z:0, x:0, y:0}, {z:1, x:1, y:1})
tl.fromTo("nav", { y: "-100%"}, { y: "0%" })
tl.fromTo(".title", { opacity: 0}, {opacity: 1})

// Mouse Color
let mouseDown = false
let rgb = []
window.addEventListener('mousedown', ()=> (mouseDown = true))
window.addEventListener('mouseup', ()=> (mouseDown = false))

window.addEventListener('mousemove', (e) => {
  if(mouseDown){
    rgb = [
      Math.round((e.pageX / sizes.width) * 255),
      Math.round((e.pageY / sizes.height) * 255),
      150,
   ]
   let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
   gsap.to(mesh.material.color, {
    r: newColor.r,
    g:newColor.g,
    b:newColor.b,
  })
 }
})