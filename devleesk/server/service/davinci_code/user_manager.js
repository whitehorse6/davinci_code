let RESULT = function (return_code, return_type, return_message, return_result){
	this.return_code = return_code;
	this.return_type = return_type;
	this.return_message = return_message;
	this.return_result = return_result;
	
	this.set_result = function(return_code, return_type, return_message, return_result){
		this.return_code = return_code;
		this.return_type = return_type;
		this.return_message = return_message;
		this.return_result = return_result;
	};
	
	this.get_result = function(){
		return {
			return_code : this.return_code,
			return_type : this.return_type,
			return_message : this.return_message,
			return_result : this.return_result
		}
	};
}
let user_manager = (server, io) => {
	io.on('connection', (soc) =>{
		soc.on('login', (user_id) =>{
			let result = new RESULT();
			
			if (user_check(user_id)){
				result.set_result(200, "success", "로그인 성공", user_id);
				global.user_list.add(user_id, soc.id);	
				
			}
			else 
				result.set_result(400, "fail", "아이디가 존재 하지 않습니다.", user_id);
			console.log(global.user_list.get_list());
			soc.emit('login_result', result.get_result());
		})
	})
}


let USER = [
	{id : "devleesk", socket_id : null},
	{id : "dgkwon", socket_id : null},
	{id : "babuki", socket_id : null},
];


let user_check = (user_id) => {
	let flag = false;
	USER.forEach((item) => {
		if (item.id == user_id)
			flag = true;
	})
	return flag;
}
exports.user_manager = user_manager;