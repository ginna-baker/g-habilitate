function gHabilitate(canvasId, borderPadding, moveSensitivity) {
  this._canvasId = canvasId;
  this._borderPadding = borderPadding || 5;
  this._moveSensitivity = moveSensitivity || 1;
  this._canvas;
  this._context;
  this._moveBall;
  this._targetBall;
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
  window.addEventListener("keydown", this._keyDownHandler, true);

  this.draw();
};

gHabilitate.prototype.draw = function() {
  this._drawWalls();
  this._drawBalls();
};

gHabilitate.prototype._drawBalls = function() {
  // First draw target, then draw move over it.
  this._drawBall(this._targetBall);
  this._drawBall(this._moveBall);
};

gHabilitate.prototype.moveUp = function() {
  console.log('Moving Up');
  // Move the ball 1 up by subtracting 1 from y
  this._moveBall.y -= this._moveSensitivity;
  var ballTopEdge = this._moveBall.y - this._moveBall.radius;
  if(ballTopEdge <= this._borderPadding){
    // Keep the ball from moving through the top wall
    this._moveBall.y = this._borderPadding + this._moveBall.radius;
  }
};

gHabilitate.prototype._keyDownHandler = function(event) {
  var pressedKey = event.which;

  console.log(event);

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

  // redraw everything
  this.draw();
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
  this._context.clearRect(0, 0, this._canvasWidth, canvas.this._canvasHeight);
};

function Ball(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
}

// $(function(){

//     ctx.strokeStyle="blue";
//     ctx.fillStyle="red";

//     draw();

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


//
// }); // end $(function(){});

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