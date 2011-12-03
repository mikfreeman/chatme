  var socket;

 function sendMessage()
 {
 	var message = $('#themessage').val();
	$('#themessage').val('');	 	
 	socket.emit('newMessage', { message:message });
 	

 }
 
 function recievedMessage(data)
 {	

 	$('#messages').append("<p>" + data.message + "</p>");
 }

$(document).ready(function(){
	$('#sendButton').click(sendMessage);

	socket = io.connect('http://localhost:80');
	
  	socket.on('chat', recievedMessage);
  
 });
 
