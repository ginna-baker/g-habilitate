var tessel = require('tessel');
var accel = require('accel-mma84').use(tessel.port['A']);

var net = require('net');
var client = new net.Socket();
var IP = '192.168.1.254';
var PORT = 7999;

console.log('Tessel starting up.')

accel.on('error', function(err){
  console.log('accel Error:', err);
});

client.on('close', function() {
  console.log('Connection closed');
});

accel.setOutputRate(1.8, function() {
  client.connect(PORT, IP, function() {
    console.log('Tessel connected to server.');

    // Initialize the accelerometer.
    accel.on('ready', function () {
      console.log('Accelerometer is ready.');

      accel.on('data', function (xyz) {
        // var result = {
        //   x: xyz[0].toFixed(2),
        //   y: xyz[1].toFixed(2),
        //   // z: xyz[2].toFixed(2)
        // };
        // client.write(JSON.stringify(result));
        client.write('{ "x" : "' + xyz[0].toFixed(2) + '", "y": "' +  xyz[1].toFixed(2) + '" }')
      });// accel.on('data'

    });// accel.on('ready'

  });// client.connect

});// accel.setOutputRate

