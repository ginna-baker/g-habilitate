function gHabilitate(canvasId, borderPadding, moveSensitivity) {
  this._canvasId = canvasId;
  this._borderPadding = borderPadding || 5;
  this._moveSensitivity = moveSensitivity || 1;
  this._canvas;
  this._context;
  this._moveBall;
  this._targetBall;
  this._prevCoordinates;

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

gHabilitate.prototype.setMoveSensitivity = function(newMoveSensitivity) {
  this._moveSensitivity = newMoveSensitivity;
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

gHabilitate.prototype.moveBall = function(currentCoordinates) {
  if(this._prevCoordinates === undefined) {
    this._prevCoordinates = currentCoordinates;
  }

  var newX = (+this._prevCoordinates.x) + (+currentCoordinates.x);
  var newY = (+this._prevCoordinates.y) + (+currentCoordinates.y);

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