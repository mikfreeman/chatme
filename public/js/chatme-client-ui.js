var io = io.connect();

$(document).ready(function() {
	var chatClient = new ChatClient(io);
	
	$.subscribe("roomJoined", function(event,room){
		displayMessage("Welcome to " + room.description);

		$('nav-list > li,.active').removeClass('active');
		$("#" + room.id).addClass('active');
	});

	$.subscribe("message", function(event,message){
		displayMessage("Welcome to " + message);
	});

	// $('#sendButton').click(chatMeClient.sendMessage);
	
	// $(document).keypress(function(e) {
 //    	if(e.which == 13) {
 //        	chatMeClient.sendMessage();
 //    	}
	// });
				
	chatClient.joinRoom("Lobby");
});

function displayMessage(message) {
	$(".message-area").append("<p class='alert alert-info'>" + message + "</p>");
};