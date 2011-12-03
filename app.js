
/**
 * Module dependencies.
 */
require.paths.push('/usr/local/lib/node_modules');
var express = require('express');
var io = require('socket.io').listen(80);

io.configure(function () {
  io.set('transports', ['websocket', 'flashsocket', 'xhr-polling']);
});

io.sockets.on('connection', function (socket) {

  console.log("New User Connected");
  socket.broadcast.emit('chat', { message: 'another user joined' });
  
  socket.on('newMessage', function (data) {
    console.log(data.message);
    socket.broadcast.emit('chat', { message: data.message });	
  });
  
});

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'NodeJs Chatme Client'
  });
});

app.listen(3000);
//console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
