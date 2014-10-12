function gHabilitate(canvasId, borderPadding, moveSensitivity) {
  this._canvasId = canvasId;
  this._borderPadding = borderPadding || 5;
  this._moveSensitivity = moveSensitivity || 1;
  this._canvas;
  this._context;
  this._moveBall;
  this._targetBall;

  // TODO : Proof of concept.
  this._snake = false;
}

gHabilitate.prototype.init = function() {
  this._canvas = document.getElementById(this._canvasId);
  this._canvasWidth = this._canvas.width;
  this._canvasHeight = this._canvas.height;
  this._context = this._canvas.getContext("2d");

  var midPointX = Math.round(this._canvasWidth / 2);
  var midPointY = Math.round(this._canvasHeight / 2);
  this._moveBall = new Ball(midPointX, midPointY, 5, 'red'); // TODO: Hard coded values?
  this._targetBall = new Ball(midPointX, midPointY, 10, 'green'); // TODO: Hard coded values?

  // Listen for when the user presses a key down
  var that = this;
  window.addEventListener("keydown", function(event) {
    that._keyDownHandler(event);
  }, true);

  this.draw();
};

gHabilitate.prototype.draw = function() {
  // Test.
  if(!this._snake) {
    this._clear();
  }
  // Original.
  // this._clear();
  this._drawWalls();
  this._drawBalls();
};

gHabilitate.prototype._drawBalls = function() {
  // First draw target, then draw move over it.
  this._drawBall(this._targetBall);
  this._drawBall(this._moveBall);
};

gHabilitate.prototype._moveBallOnCanvas = function(moveDirection) {
  // console.log('Moving: ' + moveDirection);
  var x_or_y = (moveDirection === 'Up' || moveDirection === 'Down') ? 'y' : 'x';
  if(moveDirection === 'Up' || moveDirection === 'Left') {
    // Move the ball up or left by subtracting the moveSensitivity from the axis.
    this._moveBall[x_or_y] -= this._moveSensitivity;
    // Calculate the edge of the ball.
    var ballEdge = this._moveBall[x_or_y] - this._moveBall.radius;
    if(ballEdge <= this._borderPadding) {
      // Keep the ball from moving off the area (over the border);
      this._moveBall[x_or_y] = this._borderPadding + this._moveBall.radius;
      // console.log('Hit wall/edge: ' + moveDirection);
    }
  } else {
    // Move the ball down or right by adding the moveSensitivity to the axis.
    this._moveBall[x_or_y] += this._moveSensitivity;
    // Calculate the edge of the ball.
    var ballEdge = this._moveBall[x_or_y] + this._moveBall.radius;

    // Calculate the wall;
    var edge = (((x_or_y === 'x') ? this._canvasWidth : this._canvasHeight) - (this._borderPadding * 2));

    if(ballEdge >= edge){
      // Keep the ball from moving off the area (over the border);
      this._moveBall[x_or_y] = edge - this._moveBall.radius;
      // console.log('Hit wall/edge: ' + moveDirection);
    }
  }

  this.draw();
};

gHabilitate.prototype.moveUp = function() {
  this._moveBallOnCanvas('Up');
};

gHabilitate.prototype.moveLeft = function() {
  this._moveBallOnCanvas('Left');
};

gHabilitate.prototype.moveDown = function() {
  this._moveBallOnCanvas('Down');
};

gHabilitate.prototype.moveRight = function() {
  this._moveBallOnCanvas('Right');
};

gHabilitate.prototype._keyDownHandler = function(event) {
  var pressedKey = event.which;

  if(pressedKey > 46) { return; } // Let keypress handle displayable characters

  switch(pressedKey){
    case 37: this.moveLeft(); break;
    case 38: this.moveUp(); break;
    case 39: this.moveRight(); break;
    case 40: this.moveDown(); break;
    default:
      return; // Quit without doing anything else. (e.g. draw)
    break;
  }
};

gHabilitate.prototype._drawWalls = function() {
  this._context.lineWidth = 2;
  this._context.strokeRect(this._borderPadding, // x
                           this._borderPadding, // y
                           (this._canvasWidth - (this._borderPadding * 2)), // width
                           (this._canvasHeight - (this._borderPadding * 2))); // height
};

gHabilitate.prototype._drawBall = function(ball) {
  this._context.fillStyle = ball.color;
  this._context.beginPath();
  this._context.arc(ball.x, ball.y, ball.radius, 0, (Math.PI * 2), false);
  this._context.closePath();
  this._context.fill();
};

// Clear the canvas for the next frame.
gHabilitate.prototype._clear = function() {
  this._context.clearRect(0, 0, this._canvasWidth, this._canvasHeight);
};

// TODO : Test this functionality.
// e.g. newCoordinates = { x : 1, y : 10, z : 3 };
gHabilitate.prototype.moveBall = function(newCoordinates) {
  var xChange = (+this._moveBall.x) + (+newCoordinates.x);
  var yChange = (+this._moveBall.y) + (+newCoordinates.y);
  if(newY > 0) { this.moveUp(); }
  if(newY < 0) { this.moveDown(); }
  if(newX < 0) { this.moveLeft(); }
  if(newY > 0) { this.moveRight(); }
};

function Ball(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
}

// $(function(){
//  var socket = io.connect();
//    socket.on('data', function (data) {
//      // console.log(data);
//      var obj = JSON.parse(data);
//      mv(obj);
//      draw();
// ;
// });

//#####################################################################
// $(function(){

//     var canvas=document.getElementById("canvas");
//     var ctx=canvas.getContext("2d");

//     ctx.strokeStyle="blue";
//     ctx.fillStyle="red";

//     var ballX=250;
//     var ballY=250;
//     var ballRadius=15;
//     var moveSensitivity = 5;

//     var targetBallX = 250;
//     var targetBallY = 250;
//     var targetBallRadius = 30;

//     var leftWall=50;
//     var rightWall=450;

//     var bottomWall = 450;
//     var topWall = 50;


//     draw();

//     function draw(){

//         // clear the canvas for the next frame
//         ctx.clearRect(0,0,canvas.width,canvas.height);

//         // tell canvas to start a new path

//         // draw walls on left and right
//         ctx.beginPath();
//         ctx.moveTo(leftWall,50);
//         ctx.lineTo(leftWall,canvas.height - 50);
//         ctx.moveTo(rightWall,50);
//         ctx.lineTo(rightWall,canvas.height -50);

//         // draw top and bottom
//         ctx.moveTo(50,50);
//         ctx.lineTo(450, 50);
//         ctx.moveTo(50,450);
//         ctx.lineTo(450, 450);

//         ctx.lineWidth=2;
//         ctx.stroke();


//         // draw a target ball
//         ctx.fillStyle = "green";
//         ctx.beginPath();
//         ctx.arc(targetBallX,targetBallY,targetBallRadius,0,Math.PI*2,false);
//         ctx.closePath();
//         ctx.fill();


//         // draw a ball that the use can move with left/right arrow keys
//         ctx.beginPath();
//         ctx.fillStyle = "red";
//         ctx.arc(ballX,ballY,ballRadius,0,Math.PI*2,false);
//         ctx.closePath();
//         ctx.fill();


//     }

//     function moveUp() {
//       // console.log('Moving Up');
//       ballY -= moveSensitivity;// move the ball 1 up by subtracting 1 from ballY
//       var ballUp=ballY-ballRadius;// calc the ball's top edge
//       // console.log(ballUp + ' : ' + topWall);
//       if(ballUp<=topWall){
//         ballY=topWall+ballRadius; // Keep the ball from moving through the top wall
//         // console.log('Hit Top Wall');
//         }
//     }

//     function moveLeft() {
//       // console.log('Moving Left');
//        ballX -= moveSensitivity;// move the ball 1 left by subtracting 1 from ballX
//       var ballLeft=ballX-ballRadius;// calc the ball's left edge
//       if(ballLeft<=leftWall){
//         ballX=leftWall+ballRadius; // Keep the ball from moving through the left wall
//         // console.log('Hit Left Wall');
//         }
//     }

//     function moveRight() {
//       // console.log('Moving Right');
//       ballX += moveSensitivity;// move the ball 1 right by adding 1 to ballX
//       var ballRight=ballX+ballRadius;// calc the ball's right edge
//       if(ballRight>=rightWall){
//         ballX=rightWall-ballRadius; // Keep the ball from moving through the right wall
//         // console.log('Hit Rigth Wall');
//         }
//     }

//     function moveDown(){
//       // console.log('Moving Down');
//       ballY += moveSensitivity;// move the ball 1 bottom by adding 1 to ballY
//       var ballBot=ballY+ballRadius;// calc the ball's right edge
//       if(ballBot>=bottomWall){
//         ballY=bottomWall-ballRadius; // Keep the ball from moving through the right wall
//         // console.log('Hit Bottom Wall');
//         }
//     }

//     // Here we just handle command keys
//     function keyDownHandler(event){
//         var key=event.which;// get which key the user pressed

//         if(key>46){ return; } // Let keypress handle displayable characters

//         switch(key){
//             case 37:  // left key
//              moveLeft();
//               break;
//             case 38:
//               moveUp();
//             break;
//             case 39:  // right key
//               moveRight();
//               break;
//             case 40:
//               moveDown();
//               break;
//             default:
//               // console.log('other key');
//             break;
//         }

//         draw();// redraw everything
//     }

//     var prev;
//     // {x:1, y:10: z: 3}
//     function mv(curr) {
//       if(prev === undefined) {
//         prev = curr;
//       }

//       var newX = (+prev.x) + (+curr.x);
//       var newY = (+prev.y) + (+curr.y);
//       // console.log(newX + " : " + newY)

//       if(newY > 0) {
//         moveUp();
//       }

//       if(newY < 0) {
//         moveDown();
//       }

//       if(newX < 0) {
//         moveLeft();
//       }

//       if(newY > 0) {
//         moveRight();
//       }
//     }


//  var socket = io.connect();
//    socket.on('data', function (data) {
//      // console.log(data);
//      var obj = JSON.parse(data);
//      mv(obj);
//      draw();

// ;
// // console.log(obj);
// // console.log(obj.x);
// });


//     // Listen for when the user presses a key down
//     window.addEventListener("keydown", keyDownHandler, true);
// }); // end $(function(){});

// #######################################################

  // this._context.beginPath();

  // // Set start position.
  // this._context.moveTo(this._borderPadding, this._borderPadding);

  // // Draw top wall.
  // this._context.lineTo((this._canvasWidth - this._borderPadding), this._borderPadding);

  // // Draw right wall.
  // this._context.lineTo((this._canvasWidth - this._borderPadding), (this._canvasHeight - 5));

  // // Draw bottom wall.
  // this._context.lineTo(this._borderPadding, (this._canvasHeight - this._borderPadding));

  // // Draw left wall.
  // this._context.lineTo(this._borderPadding, this._borderPadding);

  // this._context.lineWidth = 2;
  // this._context.stroke();

  // this._context.beginPath();
  // // Draw top wall.
  // this._context.moveTo(this._borderPadding, this._borderPadding);
  // this._context.lineTo((this._canvasWidth - this._borderPadding), this._borderPadding);
  // // Draw right wall.
  // // this._context.moveTo((this._canvasWidth - this._borderPadding), this._borderPadding);
  // this._context.lineTo((this._canvasWidth - this._borderPadding), (this._canvasHeight - 5));
  // // Draw bottom wall.
  // // this._context.moveTo(this._borderPadding, (this._canvasHeight - this._borderPadding));
  // // this._context.lineTo((this._canvasWidth - this._borderPadding), (this._canvasHeight - this._borderPadding));
  // this._context.lineTo(this._borderPadding, (this._canvasHeight - this._borderPadding));
  // // Draw left wall.
  // // this._context.moveTo(this._borderPadding, this._borderPadding);
  // // this._context.lineTo(this._borderPadding, (this._canvasHeight - 5));
  // this._context.lineTo(this._borderPadding, this._borderPadding);
// #######################################################