var tessel = require('tessel');
var accel = require('accel-mma84').use(tessel.port['A']);
var ws = require("nodejs-websocket");
var port = 8000;

console.log("it's working!");
// Set the binary fragmentation to 1 byte so it instantly sends
// anything we write to it
ws.setBinaryFragmentation(1);

// When we get a connection
var connection = ws.connect('ws://192.168.1.254:' + port, function() {
  // Create a new stream
  // var socketStream = connection.beginBinary();

accel.setOutputRate(1.8, function() {
  console.log('asd');
        // Initialize the accelerometer.
    accel.on('ready', function () {
        // Stream accelerometer data
      accel.on('data', function (xyz) {
        var ex = {};
        ex.x = xyz[0].toFixed(2);
        ex.y = xyz[1].toFixed(2);
        // ex.z = xyz[2].toFixed(2);
        var val = JSON.stringify(ex);
        console.log(val);
        connection.sendText(val);
      });
      // accel.pipe(socketStream);

    });
});


  accel.on('error', function(err){
    console.log('Error:', err);
  });


});