$(function(){
	let socket = io.connect();
	let ROOM_ID = "";
	$("#set_message_button").click(function(){
		let message = $("#message_input").val();
		socket.emit('message_to_server', message, ROOM_ID);
		$("#message_input").val("");
	})
	
	$("#set_room_button").click(function(){
		let room = $("#room_input").val();
		socket.emit('set_room', room);
		$("#room_input").val("");
	})
	
	$("#get_room_button").click(function(){
		socket.emit('get_room', "room_list_load");
	})
	
	
	socket.on('message_to_client', (data)=>{
		$("#message_list_area").text($("#message_area").text() + data.result + "\r\n");
		$("#message_list_area").scrollTop($("#message_area")[0].scrollHeight);
	})
	socket.on('room_to_client', (rooms)=>{
		if ( $("#message_area").css("display") == "none")
			$("#room_area").show();
			
		var room_list_keys = Object.keys(rooms);
		$("#room_list_area").empty();
		room_list_keys.forEach((item, idx)=>{
			if(item != "")
				$("#room_list_area").append("<button data='" + item + "'>" + item + "</button>");
		})
		room_list_area_event(socket);
	})
	
	socket.on('access_room_check', (check_code)=>{
		if (check_code.result == "success"){
			$("#message_area").show();
			$("#room_area").hide();
		}
	})
	
	socket.emit('get_room', "room_call");
	
	var room_list_area_event = function(socket){
		$("#room_list_area").find("button").click(function(){
			var room_id = $(this).attr("data");
			ROOM_ID = room_id;
			socket.emit('join_room', room_id);
		})
	}
})
