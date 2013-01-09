$(document).ready(function(){

	var socket = io.connect('http://localhost:80');
	
	var chatMeClient = new ChatMeClient(socket);

	$('#sendButton').click(chatMeClient.sendMessage);
	
	$(document).keypress(function(e) {
    	if(e.which == 13) {
        	chatMeClient.sendMessage();
    	}
	});
	
  	socket.on('chat', function(data){
  		chatMeClient.recievedMessage(data);
  	});
  
 });
 
