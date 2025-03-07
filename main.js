// Setup Scene, Camera, and Renderer
const scene = new THREE.Scene();

// Tambahkan background cerah dan grid helper
scene.background = new THREE.Color(0xf0f0f0);
const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Tambahkan Pencahayaan
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Load Textures
const loader = new THREE.TextureLoader();
const fruitTexture = loader.load('https://threejs.org/examples/textures/crate.gif'); // Contoh tekstur untuk buah
const woodTexture = loader.load('https://threejsfundamentals.org/threejs/resources/images/wood.jpg'); // Contoh tekstur untuk stem

// Buat Material dengan Texture
const cubeMaterial = new THREE.MeshStandardMaterial({ map: fruitTexture });
const stemMaterial = new THREE.MeshStandardMaterial({ map: woodTexture });

// Buat Buah (Dua Kubus)
// Agar dasar kubus tepat menyentuh grid (y = 0), kita geser pusat kubus ke y = 0.5
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cube1 = new THREE.Mesh(cubeGeometry, cubeMaterial);
const cube2 = new THREE.Mesh(cubeGeometry, cubeMaterial);

// Posisi buah (dekat satu sama lain) dengan cube center di y = 0.5
cube1.position.set(-0.7, 0.5, 0);
cube2.position.set(0.7, 0.5, 0);
scene.add(cube1);
scene.add(cube2);

// Buat Stem Vertikal untuk masing-masing buah
// Karena top buah ada di y = 1, stem vertikal harus ditempatkan agar bottom stem menyentuh y = 1.
// Dengan stem tinggi 1, maka center stem harus di y = 1.5.
const verticalStemGeometry = new THREE.BoxGeometry(0.2, 1, 0.2);
const stem1 = new THREE.Mesh(verticalStemGeometry, stemMaterial);
const stem2 = new THREE.Mesh(verticalStemGeometry, stemMaterial);
stem1.position.set(-0.7, 1.5, 0);
stem2.position.set(0.7, 1.5, 0);
scene.add(stem1);
scene.add(stem2);

// Buat Stem Horizontal yang menghubungkan kedua stem vertikal
// Letakkan di atas stem vertikal, sehingga posisi y = 2.0 (stem vertical top = 1.5 + 0.5)
const horizontalStemGeometry = new THREE.BoxGeometry(1.4, 0.2, 0.2);
const horizontalStem = new THREE.Mesh(horizontalStemGeometry, stemMaterial);
horizontalStem.position.set(0, 2.0, 0);
scene.add(horizontalStem);

// Atur posisi kamera supaya objek terlihat dengan baik
camera.position.z = 5;

// Tambahkan OrbitControls untuk interaksi
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Render Loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Responsif terhadap perubahan ukuran jendela
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
