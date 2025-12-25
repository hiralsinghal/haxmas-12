//imports 3js & css
import './style.css';
import * as THREE from 'three'; 
 //def vars, 
const scene = new THREE.Scene(); 
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
 // defining renderer

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

 renderer.setSize( window.innerWidth, window.innerHeight );
 renderer.render( scene, camera );
 

const geometry = new THREE.BoxGeometry( 3,3,3 );
const texture = new
THREE.TextureLoader().load('snoopy.jpg');
const material = new THREE.MeshBasicMaterial( { map:texture } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
 
const donut_geo = new THREE.TorusGeometry( 5, 3, 16, 50 );
const donut_tex = new THREE.MeshBasicMaterial({color: 0x272757});
const donut = new THREE.Mesh( donut_geo, donut_tex );
scene.add( donut );
 
camera.position.z = 20;
 
function animate() {
    donut.rotation.x += 0.025;
    donut.rotation.y += 0.02;
    renderer.render( scene, camera );
    requestAnimationFrame(animate);
}
 
function add_star() {
    const star_geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const star_material = new THREE.MeshBasicMaterial({color: 0xffffff});
    const star = new THREE.Mesh(star_geometry, star_material);
    
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200));
    star.position.set(x, y, z);
    scene.add(star);
}

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0000;
    camera.position.y = t * -0.0000;
}
 
document.body.onscroll = moveCamera;
moveCamera();
 
Array(200).fill().forEach(add_star);
animate();