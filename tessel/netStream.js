var net = require('net');
var client = new net.Socket();

var IP = '192.168.1.254';

client.connect(1337, IP, function() {
  console.log('Local machine connected to Tessel');
  client.write('TESSEL.');
});

client.on('data', function(data) {
  console.log('TESSEL Received: ' + data);
});

client.on('close', function() {
  console.log('Connection closed');
});

// var net = require('net');

// // get tessel IP address
// var IP = require('os').networkInterfaces().en1[0].address;

// var server = net.createServer(function(socket) {
//   socket.write('Hello\r\n');
//   socket.write('This is your Tessel talking\r\n');
//   socket.write('I\'m opening a pipe with you...\r\n');
//   socket.pipe(socket);
// });

// server.listen(1337, IP);

// console.log('Tessel listening on IP: ' + IP);