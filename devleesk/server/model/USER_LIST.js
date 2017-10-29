let USER_LIST = function (){
	this.user_list = [];
	this.add = function(user_id, socket_id){
		let user = this.get_by_id(user_id);
		if (typeof user.id == "undefined")
			this.user_list.push({id : user_id, socket_id: socket_id});
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
	this.get_user_by_socket_id = function(socket_id){
		var m = {};
		this.user_list.forEach(function(item){
			if (item.socket_id == socket_id)
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
	this.remove_user_by_socket_id = function(socket_id){
		var arr = [];
		this.user_list.forEach((item)=>{
			if (item.socket_id != socket_id)
				arr.push(item);
		this.user_list = arr;
		})
	}
}
exports.USER_LIST = USER_LIST;