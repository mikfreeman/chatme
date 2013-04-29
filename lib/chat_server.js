var socketio = require('socket.io');
var events = require('events')
  , util = require('util');

var rooms = {};
var currentRooms = {};
var nickNames = {
  used : {},
  names : {}
}

var guestNo = 1;

var ChatServer = function(server) {
	this.io = socketio.listen(server);
	var chatServer = this;
  rooms['Lobby'] = true;

  	this.io.sockets.on('connection',function(socket){

      chatServer.assignGuestName(socket);

  		socket.on('joinRoom', function(room) {
        socket.leave(currentRooms[socket.id])
        currentRooms[socket.id] = room;
  			socket.join(room);
    		socket.emit('roomJoined', room);
    		chatServer.emit('roomJoined', room);

        chatServer.addRoom(socket,room);

        socket.broadcast.to(room).emit('message', {
            text: nickNames.names[socket.id] + " has joined"
        });

  		});

  		socket.on('message', function (message) {
    		socket.broadcast.to(message.room).emit('message', {
      			text: nickNames.names[socket.id] + " : " + message.text
    		}); 
  		}); 
	});
}

util.inherits(ChatServer, events.EventEmitter)

ChatServer.prototype = new events.EventEmitter();

ChatServer.prototype.getRooms = function(){
  return Object.keys(rooms);
}

ChatServer.prototype.addRoom = function(socket,room){

  var chatServer = this;

  if (!(room in rooms)) {
    rooms[room] = true;
    socket.broadcast.emit('newRoom', room);     
    chatServer.emit('newRoom', room); 
  }

}

ChatServer.prototype.assignGuestName = function(socket) {
  var name = this.getNextGuestName();
  nickNames.names[socket.id] = name;
  nickNames.used[name] = true;
}

ChatServer.prototype.getNextGuestName = function() {
  var name = 'Guest' + guestNo++;
  return name;
}

module.exports = ChatServer;