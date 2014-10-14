var net = require('net');

// get tessel IP address
// var IP = require('os').networkInterfaces().en1[0].address;

var server = net.createServer(function(socket) {
  // socket.write('a\r\n');
  // socket.write('a talking\r\n');
  // socket.write('I\'m a with you...\r\n');
  // socket.pipe(socket); // For echo.

  socket.on('data', function(data) {
    console.log('Server recieved from Tessel: ' + data);
    // socket.write('Thanks tessel.')
  });
});

server.listen(1337);

// console.log('a listening on IP: ' + IP);