var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);



//io.configure(function () {
//  io.set('transports', ['websocket', 'flashsocket', 'xhr-polling']);
//});

// Configuration

app.configure(function(){
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
  res.sendfile( __dirname + '/public/html/chatme.html');
});

io.sockets.on('connection',function(socket){
  socket.on('joinRoom', function(room) {
    socket.emit('roomJoined', room);
  });
});

server.listen(3000);
