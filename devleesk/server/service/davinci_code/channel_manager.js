let channel_manager = (server, io) => {
	io.on('connection', (soc) =>{
		soc.on('get_room', (user_id) =>{
			io.sockets.emit('room_to_client', io.sockets.manager.rooms);
		})
		soc.on('get_user_list', () =>{
			io.sockets.emit('user_list_to_client', global.user_list.get_list());
		})
		soc.on('get_room_list', () =>{
			io.sockets.emit('room_list_to_client', global.room_list.get_list());
		})
		soc.on('set_room', (room_name) =>{
			global.room_list.add(
				room_name, 
				global.user_list.get_user_by_socket_id(soc.id),
				4,
				"ready"
			)
			io.sockets.emit('room_list_to_client', global.room_list.get_list());
		})
		/*soc.emit('user_list_to_client', ()=>{
			return io.sockets.clients()
		})*/
	})
}
exports.channel_manager = channel_manager;