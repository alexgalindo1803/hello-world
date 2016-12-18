//game programming elements
//1. mouse input
//2. graphics
//3. motion
//4. collision
//5. point update
//6. AI




//our logic control flow code

//info about the dimensions of our display area
var canvas;
//underlying graphical info of canvas element
var canvasContext;
//initialization of horizontal position or the x-axis coordinate of ball
var ballX = 50;
//ballSpeed = 10
var ballSpeedX = 10;

//initialization of vertical position or the y-axis coordinate of ball
var ballY = 50;
///ballSpeed = 4
var ballSpeedY = 4;

//Set Up Score Values
var player1Score = 0;
var player2Score = 0;
const WINNING_SCORE = 3;

//stop the game when either side wins
var showingWinScreen = false;

//define a labeled value for paddle y positon
var paddle1Y = 250;

var paddle2Y = 250;
//define a labeled value for paddle size
//a constant can not change while the game is taking place
const PADDLE_THICKNESS = 10;
const PADDLE_HEIGHT = 100;

//find the mouse position relative to the game canvas
//an event will fire everytime the mouse moves
//the program is going to call a function everytime the mouse moves
//that event is going to hand that function the mouse coordinates(event data) that it recieved as part of that event(evt)
function calculateMousePos(evt) {

  //canvas playing area
  var rect = canvas.getBoundingClientRect();
  //hadle on html page
  var root = document.documentElement;
  //mouse position within playable space calc
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;
  return {
    // JS Object Literal
    x:mouseX,

    y:mouseY

  };

}

function handleMouseClick(evt) {
  if(showingWinScreen) {
      player1Score = 0;
      player2Score = 0;
      showingWinScreen = false;
  }
}

window.onload = function() {
  //handle on canvas element
  canvas = document.getElementById('gameCanvas');
  //handle on graphics grid where we can draw graphics
  canvasContext = canvas.getContext('2d');

  //Update Rate/frequency as fps
  var framesPerSecond = 30;
  setInterval(function() {
          moveEverything();
          drawEverything();
  }, 1000/framesPerSecond);

  canvas.addEventListener('mousedown',handleMouseClick);

  canvas.addEventListener('mousemove',
    function(evt) {
      var mousePos = calculateMousePos(evt);
      //align the paddle's center on the mouse's y position
      //override paddle2Y var to mousePos
      paddle1Y = mousePos.y-(PADDLE_HEIGHT/2);

        if(paddle1Y <= 0) {
          paddle1Y = 0;
        } else if(paddle1Y+(PADDLE_HEIGHT) >= 600) {
          paddle1Y = 500;

        }


    });
}
  //function that can reset the ball
  function ballReset() {
    if(player1Score >= WINNING_SCORE ||
       player2Score >= WINNING_SCORE) {

      showingWinScreen = true;
    }
  //horizontal center of canvas
  ballX = canvas.width/2;
  //vertical center of canvas
  ballY = canvas.height/2;
  //switch the ball's direction each time it reaches the left side of the canvas
  ballSpeedX = -ballSpeedX;
}

//get right paddle chasing the ball's vertical position
function computerMovement() {

  //line up right paddle's center(not top!) to ball
  var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
  //ignore chasing the ball while it's within 35 pixls abv or blw the paddle center position(70 pixl span)
  if(paddle2YCenter < ballY-35) {
    //each cycle override current value(paddle2y(left)) with new value(right)
    //add 6 to the value inside paddle2Y then store(save) it inside paddle2Y
    paddle2Y += 6;
  } else if(paddle2YCenter > ballY+35){

    paddle2Y -= 6;
  }
}

//movement code
function moveEverything() {
  if(showingWinScreen) {
      //bale out of the function prematurely
      return;
  }
  computerMovement();

  ballX += ballSpeedX;
  // change the y position(value) each frame by some amount
  ballY += ballSpeedY;
  if(ballX < 0) {
    //bounce the ball if it gets blocked by left paddle
    if(ballY > paddle1Y &&
      ballY < paddle1Y+PADDLE_HEIGHT) {
        ballSpeedX = -ballSpeedX;
        //give ball control based on where it hits the paddles
        var deltaY = ballY -(paddle1Y+PADDLE_HEIGHT/2);
        ballSpeedY = deltaY * 0.35;
      } else {
        //call to ballReset()
        player2Score++; // must be BEFORE ballReset()
        ballReset();
      }

  }
  if(ballX > canvas.width) {
    if(ballY > paddle2Y &&
      ballY < paddle2Y+PADDLE_HEIGHT) {
        ballSpeedX = -ballSpeedX;
        //give ball control based on where it hits the paddles
        var deltaY = ballY -(paddle2Y+PADDLE_HEIGHT/2);
        ballSpeedY = deltaY * 0.35;
      } else {
        //call to ballReset()
        player1Score++;
        ballReset();
      }
  }

  if(ballY < 0) {
    ballSpeedY = -ballSpeedY;

  }
  if(ballY > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }


}

function drawNet() {
  for(var i=10;i<canvas.height; i+=40) {
    colorRect(canvas.width/2-1,i,2,20,'white');
  }

}

//draw update code
function drawEverything() {
  // next line blanks out the screen with black
  colorRect(0,0,canvas.width, canvas.height, 'black');



  if(showingWinScreen) {
      canvasContext.fillStyle =  'white';

      if(player1Score >= WINNING_SCORE){
      canvasContext.fillText("Left Player Won!", 350,200);
      } else if(player2Score >= WINNING_SCORE) {

      canvasContext.fillText("Right Player Won!", 350,200);

      canvasContext.fillText("click to continue", 350,500);
      //bale out of the function prematurely
      return;
  }
}
  drawNet();
  // this is left player paddle
  colorRect(0,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT, 'orange');

  // this is right computer paddle
  colorRect(canvas.width-PADDLE_THICKNESS,paddle2Y,PADDLE_THICKNESS,PADDLE_HEIGHT, 'yellow');

  // this line draws the ball
  colorCircle(ballX, ballY, 10, 'white');

  //Put text on the screen to use for score display
  canvasContext.fillText(player1Score, 100,100);

  canvasContext.fillText(player2Score, canvas.width-100,100);
}

function colorCircle(centerX, centerY, radius, drawColor) {
  canvasContext.fillStyle = drawColor;
  // define a shape to fill in
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0,Math.PI*2,true);
  canvasContext.fill();


}

function colorRect(leftX,topY, width,height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX,topY, width,height);

}
