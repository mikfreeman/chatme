
var ChatClient = function (io) {
	this.io = io;

	io.on('roomJoined', function(room) {
		$.publish("roomJoined", room);
	});

	io.on('message', function(message) {
		$.publish("message", message);
	});
};

ChatClient.prototype.joinRoom = function(room) {

  	this.io.emit('joinRoom', room);
}  

ChatClient.prototype.sendMessage = function(room,text) {

  	this.io.emit('message', {
  		room : room,
  		text : text
  	});
}  