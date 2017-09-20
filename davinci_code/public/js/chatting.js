$(function(){
	let socket = io.connect();
	$("#message_set").click(function(){
		let message = $("#message").val();
		$("#message").val("");
		socket.emit('message', message);
	})
	$("#room_make").click(function(){
		let room = $("#room").val();
		$("#room").val("");
		socket.emit('room_make', room);
	})
	$("#room_list_load").click(function(){
		console.log("room_list_load");
		socket.emit('req_room_list', "room_list_load");
	})
	socket.on('message', (data)=>{
		$("#message_area").text($("#message_area").text() + data + "\r\n");
		$("#message_area").scrollTop($("#message_area")[0].scrollHeight);
	})
	socket.emit('req_rooms', "room_call");
	socket.on('res_rooms', (rooms)=>{
		var room_list_keys = Object.keys(rooms);
		room_list_keys.forEach((item, idx)=>{
			$("#room_list_area").empty();
			if(item != "")
				$("#room_list_area").append("<button>" + item + "</button>");
		})
	})
	
})