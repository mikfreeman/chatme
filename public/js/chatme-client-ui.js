var currentRoom;
var chatClient;

function getRoomId(room) {
	return room.toLowerCase().replace(/\s+/g,' ');
}

function displayMessage(message,options) {
	var displayClass = options && options.displayClass ? options.displayClass : "alert-info"
	$(".message-area").append("<p class='alert " + displayClass + "'>" + message + "</p>");
};

function addRoom(room) {
	$("#roomsList").append('<li onClick="chatClient.joinRoom(\'' + room +  '\')" id="' + getRoomId(room) + '"><a href="#">' + room + '</a></li>');
};

function sendMessage() {
	var text = $("#message").val();
	chatClient.sendMessage(currentRoom,text);
	displayMessage(text,{
		displayClass : 'alert-success'
	});
	$("#message").val('');
};

function loadRooms() {
	$.get('/rooms',function(data){
		var rooms = data.rooms;
		for(var index in rooms) {
			addRoom(rooms[index]);
		}
		chatClient.joinRoom("Lobby");
	});
}

function changeNickname() {
	var nickname = $("#nickname").val();
	chatClient.changeNickname(nickname);
	return false;
}

$(document).ready(function() {
	$.subscribe("roomJoined", function(event,room){
		currentRoom = room;
		
		var roomNav = $('#' + getRoomId(room));
		if(!roomNav.length > 0) {
			addRoom(room);
		}

		if(room != "Lobby") {
			$(".message-area > .alert").remove();	
		}

		displayMessage("Welcome to " + room,{
			displayClass : 'alert-block'	
		});

		$('nav-list > li,.active').removeClass('active');
		$("#" + getRoomId(room)).addClass('active');
	});

	$.subscribe("message", function(event,message){
		displayMessage(message.text);
	});

	$.subscribe("newRoom", function(event,room){
		addRoom(room);
	});

	$('#createRoom').click(function(){
		var newRoom = $('#roomName').val();
		if(newRoom) {
			chatClient.joinRoom(newRoom);
			$('#createRoomModal').modal('hide');
		}
	});

	var socket = io.connect();
	chatClient = new ChatClient(socket);

	loadRooms();

	$('#sendButton').click(sendMessage);

	$('#changeNickname').click(changeNickname)
	
	$(document).keypress(function(e) {
    	if(e.which == 13) {
        	sendMessage();
    	}
	});
});

