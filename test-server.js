var ws = require("nodejs-websocket");
var port = 8000;

// Create the websocket server, provide connection callback
var server = ws.createServer(function (conn) {
  console.log("New connection");

  // If we get text from the client, and echo it
  conn.on("text", function (str) {
    // print it out
    console.log("Received "+str)
    // Send it back (but more excited)
    conn.sendText(str.toUpperCase()+"!!!")
  });

  // When the client closes the connection, notify us
  conn.on("close", function (code, reason) {
      console.log("Connection closed")
  });
}).listen(port);

console.log('listening on port', port);