import * as THREE from 'three';
import { GeometryHelper } from './GeometryHelper.js';
import { TextHelper } from './TextHelper.js';
		
// Scena, do której dodajemy obiekty, światła, kamerę i efekty.
let scene = new THREE.Scene();

// Kamera perspektywiczna
let camera = new THREE.PerspectiveCamera(
	75,     // fov
	window.innerWidth / window.innerHeight, // aspect ratio
	0.1,    // near
	1000    // far
);

/*
fov - field of view, czyli kąt widzenia jako parametr określający
jak szeroko widzimy na boki oraz do góry i do dołu.

aspect ratio - podział ekranu jako stosunek szerokości do wysokości,
dla kwadratu wartość ta wynosi 1:1=1, dla fullhd 16:9=1.777

near - odległość od kamery, od której obekty 3D znajdujące się w przestrzeni,
są rysowane na scenie, wszystko co znajduje się bliżej kamery niż odległość near,
nie będzie renderowane.

far - odległość od kamery, za którą obiekty 3D znajdujące się w przestrzeni,
nie są już rysowane na scenie, wszystko co znajduje się dalej od kamery niż odległość far,
nie będzie renderowane.
*/

// Umieszczenie kamery w punkcie o współrzędnych (0,0,5).
// Domyślnie kamera jest w punkcie (0,0,0).
camera.position.z = 5;

// Dodanie kamery do sceny.
scene.add(camera);

// Obiekt renderujący scenę. Za pomocą niego namalujemy na canvas naszą scenę.
// Nie musimy dodawać canvas w pliku html ponieważ Three.js tworzy go automatycznie.
let renderer = new THREE.WebGLRenderer();

// Dostosowanie canvas do szerokości i wysokości ekranu.
renderer.setSize(window.innerWidth, window.innerHeight);

// Dodanie automatyczne canvas do body.
document.body.appendChild(renderer.domElement);

// Automatyczne dostosowywanie się wyświetlania na canvas przy zmianie rozmiaru okna.
window.addEventListener("resize", (e) => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
});

// Tworzymy nowe instancje klas.
const geometryHelper = new GeometryHelper();
const textHelper = new TextHelper();

// Powołujemy do życia nowe odsłony obiektów geometrycznych.
let cube1 = geometryHelper.createCube({color: 0xff0000, wireframe: true, numSegments: 7});
let sphere1 = geometryHelper.createSphere({wireframe: true});
let cylinder1 = geometryHelper.createCylinder({wireframe: true});
let cone1 = geometryHelper.createCone({wireframe: true});

// Powołujemy do życia nowe odsłony obiektów tekstowych.
let text3d = null;
textHelper.create3dText({
	str: "Cube",
	callbackReady: function( readyText3d ) {
		text3d = readyText3d;
		scene.add(text3d);
		text3d.position.x = -0.3;
		text3d.position.y = 1;
		text3d.position.z = 0;
	}
});

const color = 0xffffff;
const intensity = 1;
const light = new THREE.DirectionalLight(color,intensity);
light.position.set(10,15,15);
light.target.position.set(0,0,0);
scene.add(light);
scene.add(light.target);
	
// Dodanie brył do sceny.
scene.add(cube1);
scene.add(sphere1);
scene.add(cylinder1);
scene.add(cone1);

// Lokalizowanie poszczególnych elementów sceny w przestrzeni 3D względem układu współrzędnych xyz.
sphere1.position.x = 2; 	// Przesunięcie po osi x.
cylinder1.position.x = 4; 	
cone1.position.x = -2; 		

// Renderowanie sceny.
function render () {
	cube1.rotation.y += 0.002;		// Rotacja bryły wokół osi y.
	cube1.rotation.x += 0.002;		// Rotacja bryły wokół osi y.
	cube1.rotation.z += 0.002;		// Rotacja bryły wokół osi z.
	sphere1.rotation.y += 0.002;	
	sphere1.rotation.x += 0.002;	
	sphere1.rotation.z += 0.002;	
	cylinder1.rotation.y += 0.002;	
	cylinder1.rotation.x += 0.002;
	cylinder1.rotation.z += 0.002;	
	cone1.rotation.y += 0.002;	
	cone1.rotation.x += 0.002;	
	cone1.rotation.z += 0.002;	
	renderer.render(scene,camera);
	requestAnimationFrame(render);
}

render();