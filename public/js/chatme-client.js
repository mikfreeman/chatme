
var ChatClient = function (io) {
	this.io = io;

	io.on('roomJoined', function(room) {
		$.publish("roomJoined", room);
	});
};

ChatClient.prototype.joinRoom = function(room) {

	var room = {
		id : "lobby",
		description : "Lobby"
	};

  	this.io.emit('joinRoom', room);
}  