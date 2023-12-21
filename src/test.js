import * as THREE from 'three';

import './style.css';

const width = window.innerWidth, height = window.innerHeight;

let cubeBuffer;

const camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 10 );
camera.position.z = 2;

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
const geometry1 = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
const geometry2 = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );


const material = new THREE.MeshBasicMaterial({ color: 'red' });
const material2 = new THREE.MeshBasicMaterial({ color: 'white' });

const mesh = new THREE.Mesh( geometry, material );
const mesh1 = new THREE.Mesh( geometry1, material );
const mesh2 = new THREE.Mesh( geometry2, material );

scene.add( mesh, mesh1, mesh2 );
mesh2.position.x = -1;
mesh2.position.y = -0.1;

mesh1.position.x = 1;
mesh1.position.y = -0.1;
const renderer = new THREE.WebGLRenderer();
renderer.setSize( width, height );

let bufferBool = false;

document.body.appendChild( renderer.domElement );

// animation
renderer.render( scene, camera );



window.addEventListener('mousedown', (event) => {
    console.log(event.clientX / width -0.5);
    console.log(event.clientY / height -0.5);
    
});

// window.addEventListener('mousedown', onMouseDownBuffer)

// function onMouseDownBuffer() {
//   bufferBool = true;
//   alert(bufferBool);
// }

if(bufferBool) {
  document.addEventListener('mousemove', function(event) {
    // Получаем позицию курсора относительно центра экрана
    var mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    var mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  
    // Изменяем положение куба в соответствии с позицией курсора
    // ПОМЕНЯЛ ЧИСЛО НА camera.position.z 
    mesh2.position.x = mouseX * camera.position.z;
    mesh2.position.y = mouseY * camera.position.z;
  });
}






// Обработчик события нажатия кнопки мыши
function onDocumentMouseDown(event) {
    event.preventDefault();
    
    // Получаем позицию мыши
    var mouse = new THREE.Vector2();
    
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    // Создаем луч от камеры к позиции мыши
    var raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    
    // Получаем список объектов, с которыми пересекается луч
    var intersects = raycaster.intersectObjects(scene.children);
    
    // Если есть пересечение, выводим информацию об объекте в консоль
    if (intersects.length > 0) {
      console.log('Объект, на который нажали мышкой:', intersects[0].object);
    //   intersects[0].object.material = 'white'
        // intersects[0].object.material = material2 ;
        cubeBuffer = intersects[0].object
    }
  }

    var buttons = document.querySelectorAll('.button--green');

    function myMethod() {
        cubeBuffer.material = material2;
        console.log(cubeBuffer);
    }

    buttons.forEach(function(button) {
        button.addEventListener('click', myMethod);
    });
    
  // Добавляем обработчик события нажатия кнопки мыши
  document.addEventListener('mousedown', onDocumentMouseDown, false);


    // Функция для скрепления объектов


// Функция анимации
function animate() {
    requestAnimationFrame(animate);
    // Это ограничения перемещения куба
    mesh2.position.x = Math.min(Math.max(mesh2.position.x, -1), 1);
    mesh2.position.y = Math.min(Math.max(mesh2.position.y, -1), 1);

    

    renderer.render(scene, camera);
}
animate();

