/**
 * http://usejsdoc.org/
 */
exports.user_manager = (function (){
	console.log('hello');
	var users=[],uuid=require('uuid');
	function User(userName) { 
		this.userId=uuid();
		this.userName=userName;
	}
	/* Getters of GameRoom */
	User.prototype.getUserName = function(){
		return this.userName;
	};
	User.prototype.getUserId= function(){
		return this.userId;
	};
	
	///user생성
	//console.log(uuid);
	function createUser(userName){
		var newUser;
		newUser = new User(userName);
		users.push(newUser);
		return newUser.userId;
	}
	//user목록
	function getUserList(){
		return users;
	}
	
	//user찾기
	function getUser(userId){
		var i;
		for(i=0;i<users.length;i+=1){
			if(users[i].userId===userId){
				return users[i]; 
			}
			
		}
		return null;
	}
	return {
		createUser:createUser,
		getUserList:getUserList,
		getUser:getUser
	}
})();