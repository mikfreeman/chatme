var io = io.connect();
var currentRoom;
var chatClient;

function displayMessage(message,options) {
	var displayClass = options && options.displayClass ? options.displayClass : "alert-info"
	$(".message-area").append("<p class='alert " + displayClass + "'>" + message + "</p>");
};

function sendMessage() {
	var text = $("#message").val();
	chatClient.sendMessage(currentRoom,text);
	displayMessage(text,{
		displayClass : 'alert-success'
	});
	$("#message").val('');
};

$(document).ready(function() {
	chatClient = new ChatClient(io);
	
	$.subscribe("roomJoined", function(event,room){
		currentRoom = room;
		displayMessage("Welcome to " + room,{
			displayClass : 'alert-block'	
		});

		$('nav-list > li,.active').removeClass('active');
		$("#" + room.toLowerCase().replace(/\s+/g,' ')).addClass('active');
	});

	$.subscribe("message", function(event,message){
		displayMessage(message.text);
	});

	$('#sendButton').click(sendMessage);
	
	$(document).keypress(function(e) {
    	if(e.which == 13) {
        	sendMessage();
    	}
	});
				
	chatClient.joinRoom("Lobby");
});

