

const chatting_manager = (server, io) => {
	io.on('connection', (soc) => {
		soc.on('message_to_server', (message, room_id) => {
			io.sockets.in(room_id).emit('message_to_client', {
				code : 200,
				user_id : soc.id,
				room_id : room_id,
				result : "id[" + soc.id + "], massage - [" + message + "]"
			});
		});
		soc.on('get_room', (rooms) => {
			io.sockets.emit('room_to_client', io.sockets.manager.rooms);
		});
		soc.on('set_room', (room) => {
			soc.join(room);
			io.sockets.emit('room_to_client', io.sockets.manager.rooms);
		});
		soc.on('join_room', (room_id) =>{
			
			soc.join(room_id);
			io.sockets.in(room_id).emit('access_room_check', {
				code : 200,
				user_id : soc.id,
				room_id : room_id,
				result : "success"
			});
			io.sockets.in(room_id).emit('message_to_client', {
				code : 200,
				user_id : soc.id,
				room_id : room_id,
				result : "id[" + soc.id + ", join room[" + room_id + "]"
			});
			console.log("rooms = " + io.sockets.manager.rooms[room_id])

		});
	})
}
exports.chatting_manager = chatting_manager;