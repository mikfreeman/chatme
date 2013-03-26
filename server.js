var express = require('express')
  , app = express()
  , server = require('http').createServer(app);

var chat_server = require('./lib/chat_server');
var rooms = [];

//io.configure(function () {
//  io.set('transports', ['websocket', 'flashsocket', 'xhr-polling']);
//});

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

app.get('/', function(req, res){
  res.sendfile( __dirname + '/public/html/chatme.html');
});

app.get('/rooms', function(req, res){
  res.json({'rooms' : chatServer.getRooms()});
});

server.listen(3000);
chatServer = new chat_server(server);

chatServer.on('roomJoined', function(room){
  //We can use this to trigger other events. E.g. Update User count etc
});