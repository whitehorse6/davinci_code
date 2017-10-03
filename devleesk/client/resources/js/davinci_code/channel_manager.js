$(function(){
	socket.emit('get_user_list');
	socket.emit('get_room_list');
	
	socket.on('user_list_to_client', (clients) => {
		$("#user_list_area").empty();
		let html = ''
		clients.forEach((item)=>{
			html += '<tr>';
				html += '<td>' + item.id + '</td>';
				html += '<td>' + item.socket_id + '</td>';
			html += '</tr>';
		})
		$("#user_list_area").append(html);
	})
	
	$("#make_room_button").click(function(){
		let room = $("#room_name").val();
		socket.emit('set_room', room);
		$("#room_name").val("");
	})
	
	socket.on('room_list_to_client', (rooms)=>{
		$("#game_room_list_area").empty();
		let html = '';
		rooms.forEach((item, idx)=>{
			if(item != "") {
				html += '<tr>';
					html += '<td>' + item.room_name + '</td>';
					var user_str = '';
					item.members.forEach((u_item, u_idx)=>{
						user_str += u_item.id + " ";
					})
					html += '<td>' + user_str + '</td>';
					html += '<td>' + item.members.length + "/" + item.max_member + '</td>';
					html += '<td>' + item.status + '</td>';
				html += '</tr>';
			}
		})
		$("#game_room_list_area").append(html);
		//room_list_area_event(socket);
	})
})