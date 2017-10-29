let ROOM_LIST = function (){
	this.room_list = [];
	this.add = function(room_name, user_info, max_member, status){
		this.room_list.push({
			room_name : room_name, members : [user_info], 
			max_member : max_member, status : status
		});
	}
	this.get_room_by_room_name = function(room_name){
		var m = {};
		this.room_list.forEach(function(item){
			if (item.room_name == room_name)
				m = item;
		})
		return m;
	}
	this.get_room_by_user_info = function(user_info){
		var m = {};
		this.room_list.forEach(function(item, idx){
			item.members.forEach(function(m_item){
				if (m_item.id == user_info.id)
					m = item;
			})
		})
		return m;
	}
	this.get_list = function(){
		return this.room_list;
	}
	this.join = function(room_name, user_id){
		this.room_list.forEach(function(item, idx){
			if (item.room_name == room_name){
				this.room_list[idx].mebers.forEach(function(m_item, m_idx){
					if (m_item != user_id)
						this.room_list[idx].mebers.push(user_id);
				})
			}
		})
	}
	this.leave = function(room_name, user_info){
		console.log("leave - " + room_name + " - " + user_info)
		this.room_list.forEach(function(item, idx){
			if (item.room_name == room_name){
				var arr = [];
				this.room_list[idx].mebers.forEach(function(m_item, m_idx){
					if (m_item.id != user_id.id)
						arr.push(m_item);
				})
				this.room_list[idx].mebers = arr;
			}
		})
	}
	
}
exports.ROOM_LIST = ROOM_LIST;