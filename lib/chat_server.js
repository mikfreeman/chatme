var ChatServer = function(server) {
	this.io = socketio.listen(server);

  	this.io.sockets.on('connection',function(socket){
  		socket.on('joinRoom', function(room) {
    		socket.emit('roomJoined', room);
  		});
	});
}

var socketio = require('socket.io');
var events = require('events')
  , util = require('util');

util.inherits(ChatServer, events.EventEmitter)

ChatServer.prototype = new events.EventEmitter();

module.exports = ChatServer;