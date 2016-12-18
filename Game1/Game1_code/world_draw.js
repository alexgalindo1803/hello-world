var canvas;

var canvasContext;

var babyJesusX = 630;
var babyJesusY = 290;

var babyJesusSpeedX = 5;
var babyJesusSpeedY = 5;

const BABYJESUS_WIDTH = 20;
const BABYJESUS_HEIGHT = 20;


var vertWidth = 20;
var vertHeight = 60;

var horiWidth = vertWidth+(vertWidth*2);
console.log(horiWidth);
var horiHeight = vertHeight/3;
console.log(horiHeight);
var vertLeftX = 400;

var vertTopY = 300;

var horiLeftX = vertLeftX + vertWidth;

var horiTopY = vertTopY+(0.66*vertHeight);

canvas = document.getElementById('gameCanvas');
canvasContext = canvas.getContext('2d');

var rect = canvas.getBoundingClientRect();

function calculateMousePos(evt) {

  var root = document.documentElement;
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;
  return {
    x:mouseX,

    y:mouseY

  };

}
window.onload = function() {

  var framesPerSecond = 30;
  setInterval(function() {
          drawEverything();
  }, 1000/framesPerSecond);



  canvas.addEventListener('mousemove',
  function(evt) {
    var mousePos = calculateMousePos(evt);

    babyJesusX = mousePos.x-(BABYJESUS_WIDTH/2);
    //console.log(babyJesusX);
    babyJesusY = mousePos.y-(BABYJESUS_HEIGHT/2);
    //console.log(babyJesusY);

    onCanvasBound();

  });

}

function onCanvasBound() {
    if(babyJesusX <= rect.left+150) {
      babyJesusX = 150;

    } else if(babyJesusX+(BABYJESUS_WIDTH + 7) >= rect.right-150) {
      babyJesusX = 630;
      //if babyJesusX >
    }

    if(babyJesusY <= rect.top+200) {
      babyJesusY = 200;
    } else if(babyJesusY+(BABYJESUS_WIDTH + 7) >= rect.bottom-200) {
      babyJesusY = 380;
    }
}


    //change the x/y position(value) of babyJesus each frame


function drawEverything () {
//canvas background
colorRect(0, 0, canvas.width, canvas.height, 'black');
//playing floor
colorRect(150, 200, 500, 200, 'white');

//babyJesus player
colorRect(babyJesusX, babyJesusY, BABYJESUS_WIDTH, BABYJESUS_HEIGHT, 'orange');

//rotating axels
drawRotatingLShapedWall(vertLeftX, vertTopY, horiLeftX, horiTopY,vertWidth, vertHeight, horiWidth, horiHeight, 'blue', 'grey');

}


function colorRect(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);

}

function drawRotatingLShapedWall(vertLeftX, vertTopY, horiLeftX, horiTopY, vertWidth, vertHeight, horiWidth, horiHeight, vertColor, horiColor) {
  //vertical wall
  canvasContext.fillStyle = vertColor;
  canvasContext.fillRect(vertLeftX, vertTopY, vertWidth, vertHeight, vertColor);
  //horizontal wall
  canvasContext.fillStyle = horiColor;
  canvasContext.fillRect(horiLeftX, horiTopY, horiWidth, horiHeight, horiColor);
}
