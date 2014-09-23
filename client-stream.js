var ws = require("nodejs-websocket");
var port = 8000;
// var es = require("es");
// var reader =

console.log("it's working!");
// Set the binary fragmentation to 1 byte so it instantly sends
// anything we write to it
ws.setBinaryFragmentation(1);

// When we get a connection
var connection = ws.connect('ws://192.168.1.51:' + port, function() {
  // Create a new stream
  var socketStream = connection.beginBinary();
  // Pipe the data from stdin to our server
  process.stdin.pipe(socketStream);
});