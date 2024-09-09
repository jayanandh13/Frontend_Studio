var radius = 240; 
var autoRotate = true; 
var rotateSpeed = -60; 
var imgWidth = 120; 
var imgHeight = 170; 

// Background music URL and control - set 'null' if no background music
var bgMusicURL = 'null';
var bgMusicControls = true;

// Start the animation after 1000 milliseconds
setTimeout(init, 1000);

var odrag = document.getElementById('drag-container');
var ospin = document.getElementById('spin-container');
var aImg = ospin.getElementsByTagName('img');
var aVid = ospin.getElementsByTagName('video');
var aEle = [...aImg, ...aVid]; // Combine the images and videos into a single array


ospin.style.width = imgWidth + "px";
ospin.style.height = imgHeight + "px";


var ground = document.getElementById('ground');
ground.style.width = radius * 3 + "px";
ground.style.height = radius * 3 + "px";

function init(delayTime) {
  for (var i = 0; i < aEle.length; i++) {
    // Set rotation and translateZ to position images/videos in a circular 3D space
    aEle[i].style.transform = "rotateY(" + (i * (360 / aEle.length)) + "deg) translateZ(" + radius + "px)";
    // Add transition for smoother entry effect
    aEle[i].style.transition = "transform 1s ease";
    aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
  }
}

// Apply the rotation and transformation for drag events
function applyTranform(obj) {
 
  if (tY > 180) tY = 180;
  if (tY < 0) tY = 0;

  // Apply the X and Y rotation transformations
  obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + tX + "deg)";
}

// Control the spin/animation state
function playSpin(yes) {
  ospin.style.animationPlayState = (yes ? 'running' : 'paused');
}

var sX, sY, nX, nY, desX = 0, desY = 0, tX = 0, tY = 10;

// Auto-spin logic
if (autoRotate) {
  var animationName = (rotateSpeed > 0 ? 'spin' : 'spinRevert');
  ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
}

// Setup events for dragging
document.onpointerdown = function (e) {
  clearInterval(odrag.timer); // Stop any ongoing animation
  e = e || window.event;
  sX = e.clientX;
  sY = e.clientY;

  document.onpointermove = function (e) {
    e = e || window.event;
    nX = e.clientX;
    nY = e.clientY;
    desX = nX - sX;
    desY = nY - sY;
    tX += desX * 0.1; 
    tY += desY * 0.1; 
    applyTranform(odrag);
    sX = nX;
    sY = nY;
  };

  document.onpointerup = function () {
    // Add gradual slowdown after the drag event ends
    odrag.timer = setInterval(function () {
      desX *= 0.95; 
      desY *= 0.95; 
      tX += desX * 0.1;
      tY += desY * 0.1;
      applyTranform(odrag);
      playSpin(false); 
      if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
        clearInterval(odrag.timer); 
        playSpin(true); 
      }
    }, 17);
    document.onpointermove = document.onpointerup = null;
  };

  return false;
};

// Mouse scroll to zoom in/out the carousel
document.onmousewheel = function (e) {
  e = e || window.event;
  var d = e.wheelDelta / 20 || -e.detail; 
  radius += d;
  init(1); 
};
