import * as THREE from 'https://unpkg.com/three@0.120.1/build/three.module.js';
import { Vector3 } from 'https://unpkg.com/three@0.120.1/build/three.module.js';
import { GLTFLoader } from '/GLTFLoader.js';


let sliderImages = document.querySelectorAll(".slide");
let leftArrows = document.querySelectorAll(".arrow-left");
let rightArrows = document.querySelectorAll(".arrow-right");
let dropdownHeaders = document.querySelectorAll(".dropdownsection");

let currents = [];
let oldWindowWidth = window.innerWidth;
let oldWindowHeight = window.innerHeight;
let haveRemoved = false;
let switchedToMobile = false;

let oldWidth = 0;
let clickedMenu = false;
console.log("help");

if (window.location.href.includes("mobile.html")) {
  switchedToMobile = true
}

console.log("This is the width: " + window.innerWidth);
checkForMobilePage();

let thisSliderImages = null,
    thisArrowLeft = null,
    thisArrowRight = null;

/*comment*/
function toggleVisibility(className) {
  let elements = document.querySelectorAll("." + className);

  elements.forEach(function(element) {
    if (element.className.includes("collapsibleIcon")) {
      if (element.innerText == "-" ) {
        element.innerText = "+";
      }
      else {
        element.innerText = "-";
      }
    }
    else {
      if (element.style.display != "none") {
        element.style.display = "none";
      }
      else {
        if (element.className.includes("slidePic") && window.innerWidth >= 801) {
          element.style.display = "flex";
        }
        else {
          element.style.display = "block";
        }
      }
    }
  })
}

// Clear all images
function reset() {
  for (let i = 0; i < thisSliderImages.length; i++) {
    thisSliderImages[i].style.display = "none";
  }
}
  
// Initial slide
function startSlide() {
  sliderImages.forEach(element => {
    thisSliderImages = Array.from(sliderImages).filter(function (item) {
      return item.dataset.num == element.dataset.num;
    });
    reset();
    thisSliderImages[0].style.display = "block";
  });
  
}
  
// Show previous
function slideLeft(num) {
  reset();
  thisSliderImages[currents[num] - 1].style.display = "block";
  currents[num]--;
}
  
// Show next
function slideRight(num) {
  reset();
  thisSliderImages[currents[num] + 1].style.display = "block";
  currents[num]++;
}

var clickLeftFunction = function(num) {
  thisSliderImages = Array.from(sliderImages).filter(function (item) {
    return item.dataset.num == num;
  });
  if (typeof currents[num] === 'undefined') {
    currents[num] = 0;
  }

  if (currents[num] === 0) {
    currents[num] = thisSliderImages.length;
  }

  slideLeft(num);
}

var clickRightFunction = function(num) {
  thisSliderImages = Array.from(sliderImages).filter(function (item) {
    return item.dataset.num == num;
  });
  if (typeof currents[num] === 'undefined') {
    currents[num] = 0;
  }

  if (currents[num] === thisSliderImages.length - 1) {
    currents[num] = -1;
  }

  slideRight(num);
}
  
// Left arrow click event listeners
leftArrows.forEach(function(element) {
  element.addEventListener("click", function(){
    clickLeftFunction(element.dataset.num);
  });
});
// Right arrow click event listeners
rightArrows.forEach(function(element) {
  element.addEventListener("click", function() {
    clickRightFunction(element.dataset.num);
  })
});

dropdownHeaders.forEach(function(element) {
  element.addEventListener("click", function() {
    toggleVisibility(element.dataset.id);
  })
});
  
startSlide();

// Place the arrows

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

const toggleButton = document.getElementById("toggleButton");
const navList = document.getElementById("navi-list");

toggleButton.addEventListener("mousedown", () => {
  if(navList.classList.contains('active')) {
    clickedMenu = false;
  }
  else {
    clickedMenu = true;
  }
})

document.body.addEventListener('mouseup', function() {
  if(navList.classList.contains('active')) {
    if (!clickedMenu) {
      navList.classList.toggle('active');
    }
  }
  else if( clickedMenu ) {
    navList.classList.toggle('active');
  }
  clickedMenu = false;
});


// Setup

const scene = new THREE.Scene();
const loader = new GLTFLoader();
let crystal;
loader.load( 'Crystal.glb', function (gltf) {

  const crystalLoad = gltf.scene;
  crystal = crystalLoad;

}, undefined, function (error) {
  console.error(error);
});


const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
const camera2 = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

var is_mobile = window.matchMedia("only screen and (max-width: 760px)").matches;

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
scene.background = new THREE.Color( 0x1d1f21 );
camera.position.setZ(44);
camera.position.setY(-10);
camera.position.setX(20);
camera2.position.setZ(44);
camera2.position.setY(-10);
camera2.position.setX(20);

renderer.render(scene, camera);

// Torus
const radius = 5.25;
const tubeRadius = .035;
const radialSegments = 3;
const tubularSegments = 3;

const geometry = new THREE.TorusGeometry( radius, tubeRadius, radialSegments, tubularSegments );
const geometry2 = new THREE.TorusGeometry( radius/1.55, tubeRadius*.7, radialSegments, tubularSegments );
const material = new THREE.MeshStandardMaterial( { color: 0xA8F9A9 } );
const material2 = new THREE.MeshStandardMaterial( { color: 0x6AF2F0 } );
const torus = new THREE.Mesh( geometry, material );
const torus2 = new THREE.Mesh( geometry2, material2 );
const torScale = torus.scale;
const tor2Scale = torus2.scale;
torus.position.set(10000,99900000,1);

//scene.add(torus);
//scene.add(torus2);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

//Array(200).fill().forEach(addStar);

// Background

//const spaceTexture = new THREE.TextureLoader().load('space.jpg');
//scene.background = spaceTexture;

// Avatar

window.addEventListener( 'load', onWindowLoad, false);

function onWindowLoad() {
  camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    camera2.aspect = window.innerWidth / window.innerHeight;
    camera2.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
    repositionObjects();
    scene.add(torus);
    scene.add(torus2);
    scene.add(crystal);
    resizeHandler();
}

document.addEventListener("DOMContentLoaded", function(event) { 
  checkForMobilePage();
});

$(window).resize(function(){
  resizeHandler();
});

function checkForMobilePage() {
  console.log("Checking for mobile");
  if (window.innerWidth < 1300 && !switchedToMobile) {
    switchedToMobile = true;
    window.location.href = "mobile.html";
  }
  else if (window.innerWidth >= 1300 && switchedToMobile) {
    switchedToMobile = false;
    window.location.href = "index.html";
  }
}

function resizeHandler() {

  checkForMobilePage();

  //camera.fov = 2 * Math.atan(window.innerHeight/ (2 * camera.position.z)) * (180/Math.PI);
  camera.aspect = window.innerWidth / window.screen.availHeight;
  //camera.aspect = window.innerWidth / window.innerHeight;
  if (!is_mobile) { // desktop specific vertical scaling accomodation
    //torus.scale.setX(torScale.x + ((1-(window.screen.availHeight/window.innerHeight))/500));
    //torus2.scale.setX(tor2Scale.x + ((1-(window.screen.availHeight/window.innerHeight))/500));
  }
  //crystal.scale.setX(crystalScale + ((1-(window.screen.availHeight/window.innerHeight))/1000));
  camera.updateProjectionMatrix();
  camera.position.setZ(44);
  camera2.fov = 45;
  camera2.aspect = window.innerWidth / window.innerHeight;
  camera2.updateProjectionMatrix();
  //camera2.position.setZ(window.innerHeight/2 / Math.tan(45/2));

  renderer.setSize( window.innerWidth, window.innerHeight );
  repositionObjects();

  oldWindowWidth = window.innerWidth;
  oldWindowHeight = window.innerHeight;
  //location.reload();
}

var plane = new THREE.Plane().setFromNormalAndCoplanarPoint(new THREE.Vector3(0,0,1), new Vector3(0,0,1));

var raycaster = new THREE.Raycaster();
var corner = new THREE.Vector2();
var cornerPoint = new THREE.Vector3();
var offset = new THREE.Vector2(.5, -.45, -1);
var titleElem = document.getElementById("sitetitle");
var titlePos = titleElem.getBoundingClientRect();
var offset = new THREE.Vector3(1 * (1/(.5*window.innerWidth)), 19, -15);
var mobileOffset = new THREE.Vector3(-5, .3, -15);
console.log("mobile offset: ");

function repositionObjects() {
  //titleElem = document.getElementById("sitetitle");
  resizeBackground();
  titlePos = titleElem.getBoundingClientRect();
  console.log(titlePos.right/window.innerWidth);
  corner.set(2 * (titlePos.right/window.innerWidth) - 1, titlePos.top + 1);
  raycaster.setFromCamera(corner, camera2);
  raycaster.ray.intersectPlane(plane, cornerPoint);
  console.log("window inner width: ", window.innerWidth);
  if (window.innerWidth > 2900) {
    offset.set(1000 * (1/(window.innerWidth))-19.6, 19, -15);
  }
  else if (window.innerWidth > 2550) {
    offset.set(5000 * (1/(window.innerWidth))-12, 19, -15);
  }
  else if (window.innerWidth > 2040) {
    offset.set(15000 * (1/(window.innerWidth))-12, 19, -15);
  }
  else if (window.innerWidth > 1560) {
    offset.set(1950 * (1/(.5*window.innerWidth)), 19, -15);
  }
  else if (window.innerWidth > 650) {
    offset.set(12000 * (1/(window.innerWidth)), 19, -15);
  }
  else {
    offset.set(17, 19, -15);
  }

  if (is_mobile) {
    offset.add(new THREE.Vector3(-1,-2.75,0)); 
  }

  if (window.innerHeight <  700 && window.screen.availHeight > 700) {
    if (haveRemoved == false) {
      haveRemoved = true;
      scene.remove(torus);
      scene.remove(torus2);
      scene.remove(crystal);
    }
  }
  else {
    if (haveRemoved == true) {
      haveRemoved = false;
      scene.add(torus);
      scene.add(torus2);
      scene.add(crystal);
    }
  }

  //offset.add(new THREE.Vector3(0,-15,40));

  torus.position.copy(cornerPoint).add(offset);
  crystal.position.set(torus.position.x,torus.position.y,torus.position.z);
  torus2.position.set(torus.position.x,torus.position.y,torus.position.z);
  //crystalScale = crystal.scale;
  
  console.log(torus.position);
}

function pixelsToCanvasWidth(num) {
  return 2*(num/window.innerWidth) - 1;
}

function pixelsToCanvasHeight(num) {
  return 2*(num/window.innerHeight) - 1;
}

var bg = jQuery("#bg");

function resizeBackground() {
  bg = jQuery("#bg");
  bg.height( jQuery(window).height() + 100);
  bg.width( jQuery(window).width() + 500);
}

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  //camera.position.z = t * -0.02;
  camera.position.y = t * 0.027;
  camera2.position.y = t * 0.027;
  //camera.rotation.y = t * -0.0007;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  if (window.innerWidth != oldWidth) {
    resizeHandler();
  }

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  //torus2.rotation.x += 0.02;
  //torus2.rotation.y += 0.010;
  //torus2.rotation.z += 0.005;
  torus2.rotation.set(torus.rotation.x + 1.5, torus.rotation.y + 1.5, torus.rotation.z + 1.5);

  crystal.rotation.x -= 0.01;
  crystal.rotation.y -= 0.005;
  crystal.rotation.z -= 0.01;


  // controls.update();
  oldWidth = window.innerWidth;

  renderer.render(scene, camera);
}


animate();

