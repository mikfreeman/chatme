function ChatMeClient(socket) {
	this.socket = socket;
};

ChatMeClient.prototype.sendMessage = function () {
	var message = $('#themessage').val();
 	$('#messages').append("<div class='alert-message block-message success'><p>" + message + "</p></div>");
 	this.scrollToBottom();
	$('#themessage').val('');	 	
	this.socket.emit('newMessage', { message:message });
};
 	
ChatMeClient.prototype.recievedMessage = function(data)
{	
 	$('#messages').append("<div class='alert-message block-message info'><p>" + data.message + "</p></div>");
 	
	this.scrollToBottom();
};
 
ChatMeClient.prototype.scrollToBottom = function ()
{
	$("#messages").scrollTop($("#messages")[0].scrollHeight);
};
