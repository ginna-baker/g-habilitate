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

// gHabilitate code.
// #########################################################################
// Get machine IP address. For conveniece if it needs to be set on tessel.
console.log(require('os').networkInterfaces().en0[1].address);
var net = require('net');
var netPORT = 7999;

var server = net.createServer(function(socket) {
  socket.on('data', function(data) {
    console.log('Server recieved from Tessel: ' + data);
    // Test for situations where two data objects arrive at the same time.
    var arr = data.toString().split('}{');
    var newObj = JSON.parse(arr[0] + (arr.length > 1 ? '}' : ''));
    console.log(newObj);
    io.sockets.emit('data', newObj);
  });
});

server.listen(7999);
// #########################################################################

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
