// Setup Scene, Camera, and Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Materials
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Kubus berwarna merah
const stemMaterial = new THREE.MeshBasicMaterial({ color: 0x8b4513 }); // Tangkai berwarna cokelat

// Geometry untuk Kubus
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

// Buat dua kubus
const cube1 = new THREE.Mesh(cubeGeometry, cubeMaterial);
const cube2 = new THREE.Mesh(cubeGeometry, cubeMaterial);

// Posisi kubus diposisikan lebih dekat (tidak berjauhan)
cube1.position.set(-0.7, 0, 0);
cube2.position.set(0.7, 0, 0);
scene.add(cube1);
scene.add(cube2);

// Geometry untuk Tangkai (Stem)
// Dengan tinggi 1, sehingga bagian bawah stem akan tepat di atas kubus (y = 0.5) dan pusatnya di y = 1.0.
const stemGeometry = new THREE.BoxGeometry(0.2, 1, 0.2);
const stem1 = new THREE.Mesh(stemGeometry, stemMaterial);
const stem2 = new THREE.Mesh(stemGeometry, stemMaterial);

// Posisi stem tepat di atas masing-masing kubus
stem1.position.set(-0.7, 1, 0);
stem2.position.set(0.7, 1, 0);
scene.add(stem1);
scene.add(stem2);

// Atur posisi kamera supaya objek terlihat dengan baik
camera.position.z = 5;

// Tambahkan OrbitControls untuk interaksi dengan mouse
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Render Loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Responsif saat window diresize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
