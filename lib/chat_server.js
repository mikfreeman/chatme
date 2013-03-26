var socketio = require('socket.io');
var events = require('events')
  , util = require('util');

var rooms = [];
var currentRooms = {};

var ChatServer = function(server) {
	this.io = socketio.listen(server);
	var chatServer = this;
  rooms.push('Lobby');

  	this.io.sockets.on('connection',function(socket){

  		socket.on('joinRoom', function(room) {
        socket.leave(currentRooms[socket.id])
        currentRooms[socket.id] = room;
  			socket.join(room);
    		socket.emit('roomJoined', room);
    		chatServer.emit('roomJoined', room);

        chatServer.addRoom(socket,room);

  		});

  		socket.on('message', function (message) {
    		socket.broadcast.to(message.room).emit('message', {
      			text: message.text
    		}); 
  		}); 
	});
}

util.inherits(ChatServer, events.EventEmitter)

ChatServer.prototype = new events.EventEmitter();

ChatServer.prototype.getRooms = function(){
  return rooms;
}

ChatServer.prototype.addRoom = function(socket,room){

  var chatServer = this;

  var roomExists = false;

  for (var index in rooms) {
    if(room == rooms[index]) {
        roomExists = true;
        break;
    }       
  };

  if(!roomExists) {
    rooms.push(room);
    socket.broadcast.emit('newRoom', room);     
    chatServer.emit('newRoom', room);    
  }
}

module.exports = ChatServer;