var ChatServer = function(server) {
	this.io = socketio.listen(server);
	var chatServer = this;

  	this.io.sockets.on('connection',function(socket){

  		socket.on('joinRoom', function(room) {
  			socket.join(room);
    		socket.emit('roomJoined', room);
    		chatServer.emit('roomJoined', room);
  		});

  		socket.on('message', function (message) {
    		socket.broadcast.to(message.room).emit('message', {
      			text: message.text
    		}); 
  		});
	});
}

var socketio = require('socket.io');
var events = require('events')
  , util = require('util');

util.inherits(ChatServer, events.EventEmitter)

ChatServer.prototype = new events.EventEmitter();

module.exports = ChatServer;