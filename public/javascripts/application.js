  var socket;

 function sendMessage()
 {
 	var message = $('#themessage').val();
 	$('#messages').append("<div class='alert-message block-message success'><p>" + message + "</p></div>");
 	scrollToBottom();
	$('#themessage').val('');	 	
 	socket.emit('newMessage', { message:message });
 }
 
 function recievedMessage(data)
 {	
 	$('#messages').append("<div class='alert-message block-message info'><p>" + data.message + "</p></div>");
 	scrollToBottom();
 }
 
 function scrollToBottom()
 {
 	$("#messages").scrollTop($("#messages")[0].scrollHeight);

 }

$(document).ready(function(){

	$('#sendButton').click(sendMessage);

	socket = io.connect('http://localhost:80',{transports:['websocket']});
	
  	socket.on('chat', recievedMessage);
  
 });
 
