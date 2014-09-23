var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig');
var routes = require('./routes/index');
var users = require('./routes/users');
var http = require('http');

var app = express();
var port = 8000;



var ws = require("nodejs-websocket")

// Create the websocket server, provide connection callback
var server = ws.createServer(function (conn) {
  // console.log("New connection");

  // When we get an incoming stream, pipe it to stdout
  conn.on("text", function(stream) {
    // stream.pipe(process.stdout);
     console.log(stream);
    io.sockets.emit('data', stream);
  });

  // When the connection closes, let us know
  conn.on("close", function (code, reason) {
      console.log("Connection closed")
  });
}).listen(port);

console.log('listening on port', port);




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
