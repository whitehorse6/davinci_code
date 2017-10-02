/*let ROOM_LIST = function (){
	this.
}
let ROOM_LIST = function (){
	this.room_list = [];
	this.add = function(room_name, socket_id, members, max_member, status){
		let room = this.get_by_room_name(room_name);
		if (typeof room.room_name == "undefined")
			this.room_list.push({
				room_name : room_name, socket_id: socket_id
			});
		else
			this.set_user_socket_id(user_id, socket_id);
		
	}
	this.get_by_id = function(user_id){
		var m = {};
		this.user_list.forEach(function(item){
			if (item.id == user_id)
				m = item;
		})
		return m;
	}
	this.get_list = function(){
		return this.user_list;
	}
	this.set_user_socket_id = function(user_id, socket_id){
		this.user_list.forEach((item, idx) => {
			if (item.id == user_id){
				this.user_list[idx].socket_id == socket_id;
			}
		})
	}
}
exports.USER_LIST = USER_LIST;*/