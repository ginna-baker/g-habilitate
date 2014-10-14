var tessel = require('tessel');
var accel = require('accel-mma84').use(tessel.port['A']);
var net = require('net');
var client = new net.Socket();

var IP = '192.168.1.254';
var PORT = 7999;

console.log('Tessel starting up.')

accel.setOutputRate(5, function() {
  client.connect(PORT, IP, function() {
    console.log('Tessel connected to server.');
    accel.on('ready', function () {
      console.log('Accelerometer is ready.');
      accel.on('data', function (xyz) {
        console.log('Accelerometer retured data. Send it to server.')
        client.write('{ "x" : "' + xyz[0].toFixed(2) + '", "y": "' +  xyz[1].toFixed(2) + '" }')
      });
    });
  });
});

accel.on('error', function(err){
  console.log('Accelerometer Error:', err);
});

client.on('close', function() {
  console.log('Connection to server closed');
});