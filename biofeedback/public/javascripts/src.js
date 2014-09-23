$(function(){

    var canvas=document.getElementById("canvas");
    var ctx=canvas.getContext("2d");

    ctx.strokeStyle="blue";
    ctx.fillStyle="red";

    var ballX=70;
    var ballY=75;
    var ballRadius=15;
    var moveSensitivity = 5;

    var targetBallX = 250;
    var targetBallY = 250;
    var targetBallRadius = 30;

    var leftWall=50;
    var rightWall=450;

    var bottomWall = 450;
    var topWall = 50;


    draw();

    function draw(){

        // clear the canvas for the next frame
        ctx.clearRect(0,0,canvas.width,canvas.height);

        // tell canvas to start a new path

        // draw walls on left and right
        ctx.beginPath();
        ctx.moveTo(leftWall,50);
        ctx.lineTo(leftWall,canvas.height - 50);
        ctx.moveTo(rightWall,50);
        ctx.lineTo(rightWall,canvas.height -50);

        // draw top and bottom
        ctx.moveTo(50,50);
        ctx.lineTo(450, 50);
        ctx.moveTo(50,450);
        ctx.lineTo(450, 450);

        ctx.lineWidth=2;
        ctx.stroke();


        // draw a target ball
        ctx.fillStyle = "green";
        ctx.beginPath();
        ctx.arc(targetBallX,targetBallY,targetBallRadius,0,Math.PI*2,false);
        ctx.closePath();
        ctx.fill();


        // draw a ball that the use can move with left/right arrow keys
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.arc(ballX,ballY,ballRadius,0,Math.PI*2,false);
        ctx.closePath();
        ctx.fill();


    }

    function moveUp() {
      console.log('Moving Up');
      ballY -= moveSensitivity;// move the ball 1 up by subtracting 1 from ballY
      var ballUp=ballY-ballRadius;// calc the ball's top edge
      console.log(ballUp + ' : ' + topWall);
      if(ballUp<=topWall){
        ballY=topWall+ballRadius; // Keep the ball from moving through the top wall
        console.log('Hit Top Wall');
        }
    }

    function moveLeft() {
      console.log('Moving Left');
       ballX -= moveSensitivity;// move the ball 1 left by subtracting 1 from ballX
      var ballLeft=ballX-ballRadius;// calc the ball's left edge
      if(ballLeft<=leftWall){
        ballX=leftWall+ballRadius; // Keep the ball from moving through the left wall
        console.log('Hit Left Wall');
        }
    }

    function moveRight() {
      console.log('Moving Right');
      ballX += moveSensitivity;// move the ball 1 right by adding 1 to ballX
      var ballRight=ballX+ballRadius;// calc the ball's right edge
      if(ballRight>=rightWall){
        ballX=rightWall-ballRadius; // Keep the ball from moving through the right wall
        console.log('Hit Rigth Wall');
        }
    }

    function moveDown(){
      console.log('Moving Down');
      ballY += moveSensitivity;// move the ball 1 bottom by adding 1 to ballY
      var ballBot=ballY+ballRadius;// calc the ball's right edge
      if(ballBot>=bottomWall){
        ballY=bottomWall-ballRadius; // Keep the ball from moving through the right wall
        console.log('Hit Bottom Wall');
        }
    }

    // Here we just handle command keys
    function keyDownHandler(event){
        var key=event.which;// get which key the user pressed

        if(key>46){ return; } // Let keypress handle displayable characters

        switch(key){
            case 37:  // left key
             moveLeft();
              break;
            case 38:
              moveUp();
            break;
            case 39:  // right key
              moveRight();
              break;
            case 40:
              moveDown();
              break;
            default:
              console.log('other key');
            break;
        }

        draw();// redraw everything
    }

    var prev;
    // {x:1, y:10: z: 3}
    function mv(curr) {
      if(prev === undefined) {
        prev = curr;
      }

      var newX = prev.x + curr.x;
      var newY = prev.y + curr.y;
      console.log(newX + " : " + newY)

      if(newY > 0) {
        moveUp();
      }

      if(newY < 0) {
        moveDown();
      }

      if(newX < 0) {
        moveLeft();
      }

      if(newY > 0) {
        moveRight();
      }
    }


    var arr = [];
arr.push({x: 0.03, y: 0.16, z: 1.03});
arr.push({x: 0.12, y: 0.23, z: 1.11});
arr.push({x: -0.03, y: 0.15, z: 0.86});
arr.push({x: 0.05, y: 0.14, z: 1.09});
arr.push({x: -0.06, y: 0.03, z: 1.37});
arr.push({x: -0.24, y: 0.09, z: 1.27});
arr.push({x: -0.30, y: -0.16, z: 0.87});
arr.push({x: -0.27, y: -0.37, z: 0.26});
arr.push({x: -0.61, y: -0.57, z: 0.31});
arr.push({x: -0.13, y: -0.17, z: 0.85});
arr.push({x: -0.08, y: -0.30, z: 1.12});
arr.push({x: 0.14, y: -0.21, z: 1.10});
arr.push({x: 0.29, y: -0.11, z: 1.08});

// arr.push({x: 1, y:-1, z: 1});
// arr.push({x: 1, y:-1, z: 1});
// arr.push({x: 1, y:-1, z: 1});
// arr.push({x: 1, y:-1, z: 1});
// arr.push({x: 1, y:-1, z: 1});
// arr.push({x: 1, y:-1, z: 1});
// arr.push({x: 1, y:-1, z: 1});
// arr.push({x: 1, y:-1, z: 1});
// arr.push({x: 1, y:-1, z: 1});
// arr.push({x: 1, y:-1, z: 1});
// arr.push({x: 1, y:-1, z: 1});
// arr.push({x: 1, y:-1, z: 1});
// arr.push({x: 1, y:-1, z: 1});

console.log(arr)

for(var i = 0; i < arr.length; i++) {
  mv(arr.pop());
}

    // Listen for when the user presses a key down
    window.addEventListener("keydown", keyDownHandler, true);
}); // end $(function(){});