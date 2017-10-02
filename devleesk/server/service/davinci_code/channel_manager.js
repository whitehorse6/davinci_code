let channel_manager = (server, io) => {
	io.on('connection', (soc) =>{
		soc.on('get_room', (user_id) =>{
			io.sockets.emit('room_to_client', io.sockets.manager.rooms);
		})
		soc.on('get_user_list', () =>{
			io.sockets.emit('user_lit_to_client', global.user_list.get_list());
		})
		soc.on('set_room', (room_name) =>{
			soc.join(room_name)
		})
		/*soc.emit('user_list_to_client', ()=>{
			return io.sockets.clients()
		})*/
	})
}
exports.channel_manager = channel_manager;