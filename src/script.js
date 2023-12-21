import * as THREE from 'three';
import './style.css';

const width = window.innerWidth, height = window.innerHeight;

let bufferBoolActive = false;
let bufferCounterObject = 0;

let cubeBuffer;
let bufferBool = false;

let bufferMainCube;
let bufferChildCube;

var buttons = document.querySelectorAll('.button--green');
var buttons1 = document.querySelectorAll('.button--yellow');
var buttons2 = document.querySelectorAll('.button--red');
var buttonDetach = document.querySelectorAll('.button-detach');

const left = -2.2, right = 2.2,
top2 = 2, bottom = -2,
near = 0.01, far = 100;
const camera = new THREE.OrthographicCamera(left, right, top2, bottom, near, far);
camera.position.z = 2;

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );

const material1 = new THREE.MeshBasicMaterial({ color: 'red' });

const green = new THREE.MeshBasicMaterial({ color: 'green' });
const yellow = new THREE.MeshBasicMaterial({ color: 'yellow' });
const red = new THREE.MeshBasicMaterial({ color: 'red' });

const mesh = new THREE.Mesh( geometry, material1 );
const mesh1 = new THREE.Mesh( geometry, material1 );
const mesh2 = new THREE.Mesh( geometry, material1 );

scene.add( mesh, mesh1, mesh2);

mesh2.position.x = -1;
mesh2.position.y = -0.1;

mesh1.position.x = 1;
mesh1.position.y = -0.1;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( width, height );

document.body.appendChild( renderer.domElement );

renderer.render( scene, camera );

window.addEventListener('mousedown', (event) => {
    console.log(event.clientX / width -0.5);
    console.log(event.clientY / height -0.5);
});

function onDocumentMouseDown(event) {
  event.preventDefault();

  var mouse = new THREE.Vector2();
  
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
  var raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);
  
  var intersects = raycaster.intersectObjects(scene.children);
  
  if (intersects.length > 0) {
      cubeBuffer = intersects[0].object
      bufferBool=!bufferBool; 
      bufferMainCube = cubeBuffer;
  }
}

document.addEventListener('mousemove', onDrag);

function onDrag(event) {
  function onControllerDrag(event, mesh10) {
    var mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    var mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    mesh10.position.x = mouseX * camera.position.z / 0.9;
    mesh10.position.y = mouseY * camera.position.z / 0.9;
  }
  if(bufferBool){
    onControllerDrag(event, cubeBuffer);
  }
}

function myMethodGreen() {
  cubeBuffer.material = green;
}

function myMethodYellow() {
  cubeBuffer.material = yellow;
}

function myMethodRed() {
  cubeBuffer.material = red;
}

function detachObject() {
  bufferMainCube.remove(bufferChildCube);

  scene.add(bufferChildCube);

  bufferBoolActive = !bufferBoolActive;
}

buttonDetach.forEach(function(button) {
  button.addEventListener('click', detachObject);
});

buttons.forEach(function(button) {
    button.addEventListener('click', myMethodGreen);
});

buttons1.forEach(function(button) {
  button.addEventListener('click', myMethodYellow);
});

buttons2.forEach(function(button) {
  button.addEventListener('click', myMethodRed);
});

let checkCollision = () => {
  if(cubeBuffer != undefined){
    for (let index = 0; index < scene.children.length; index++) {
      arrayDistance(cubeBuffer, scene.children[index]);
    }
  }
  requestAnimationFrame(checkCollision);
}

checkCollision();

function arrayDistance(distMain, distChild) {
  if(distChild.position.distanceTo(distMain.position) < 0.20 && distMain != distChild){
    cubeBuffer.attach(distChild);
    bufferMainCube = cubeBuffer;
    bufferChildCube = distChild;
  }
}

document.addEventListener('mousedown', onDocumentMouseDown, false);

function animate() {
  requestAnimationFrame(animate);
  if(bufferMainCube != undefined){
    bufferMainCube.position.x = Math.min(Math.max(bufferMainCube.position.x, -1), 1);
    bufferMainCube.position.y = Math.min(Math.max(bufferMainCube.position.y, -1), 1);
  }

  if(bufferChildCube != undefined){
    bufferChildCube.position.x = Math.min(Math.max(bufferChildCube.position.x, -1), 1);
    bufferChildCube.position.y = Math.min(Math.max(bufferChildCube.position.y, -1), 1);
  }
  
  if(bufferCounterObject < 10 && bufferMainCube != undefined && bufferChildCube != undefined && bufferBoolActive){
    
    bufferCounterObject += 0.1;
    bufferMainCube.position.x -= 0.01;
    bufferChildCube.position.x += 0.01;
    console.log("bufferCounterObject");

    if(bufferCounterObject >= 10){
      bufferCounterObject = 0;
      bufferBoolActive = false;
      console.log(bufferBoolActive);
    }
  }
  renderer.render(scene, camera);
}

animate();


