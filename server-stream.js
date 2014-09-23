var ws = require("nodejs-websocket")
var port = 8000;

// Create the websocket server, provide connection callback
var server = ws.createServer(function (conn) {
  console.log("New connection");

  // When we get an incoming stream, pipe it to stdout
  conn.on("binary", function(stream) {
    stream.pipe(process.stdout);
  });

  // When the connection closes, let us know
  conn.on("close", function (code, reason) {
      console.log("Connection closed")
  });
}).listen(port);

console.log('listening on port', port);