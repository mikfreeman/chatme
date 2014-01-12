
var ChatClient = function (io) {
	this.io = io;

	io.on('roomJoined', function(room) {
		$.publish("roomJoined", room);
	});

	io.on('message', function(message) {
		$.publish("message", message);
	});

	io.on('newRoom', function(room) {
		$.publish("newRoom", room);
	});

	io.on('connected', function(message) {
		$.publish("message", message);
	});

	io.on('nicknameChanged', function(nickname) {
		$.publish("nicknameChanged", nickname);
	});
};

ChatClient.prototype.changeNickname = function(nickname) {
  	this.io.emit('changeNickname', nickname);
}

ChatClient.prototype.joinRoom = function(room) {

  	this.io.emit('joinRoom', room);
}  

ChatClient.prototype.sendMessage = function(room,text) {

  	this.io.emit('message', {
  		room : room,
  		text : text
  	});
}  