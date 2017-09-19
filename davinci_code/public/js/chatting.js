$(function(){
	const socket = io.connect();
	$("#user_set").click(function(){
		let message = $("#message").val();
		$("#message").val("");
		socket.emit('message', message);
	})
	socket.on('message', (data)=>{
		$("#message_area").append("<li>" + data + "</li>");
	})
})