/**
 * http://usejsdoc.org/
 * author : Hyeonuk Kim
 * 
 */

/*
 * room_manager
 */


exports.room_manager = (function (){
	
	var rooms=[],uuid=require('uuid');
	
		
	//Definition for GameRoom
	//If owner user leave the room, it must be gone.
	function GameRoom(roomName,roomOwner,maxNumOfMembers) { 
		this.roomId=uuid();
		this.roomName=roomName;
		this.roomOwner=roomOwner;
		this.members=[];//owner 
		this.members.push(roomOwner);
		this.maxNumOfMembers=maxNumOfMembers;
		this.gameStatus="matching";
	}
	/* Getters of GameRoom */
	GameRoom.prototype.getRoomName = function(){
		return this.roomName;
	};
	GameRoom.prototype.getRoomOwner = function(){
		return this.roomOwner;
	};
	GameRoom.prototype.getRoomId = function(){
		return this.roomId;
	};
	GameRoom.prototype.getMembers = function(){//배열 요소가 수정 가능한게 괸찮은가?
		return this.members;
	};
	GameRoom.prototype.getStatus = function(){
		return this.gameStatus;
	};
	GameRoom.prototype.getMaxNumOfMembers = function(){
		return this.maxNumOfMembers;
	};
	
	
	//console.log(uuid);
	function createRoom(roomName,roomOwner,maxNumOfMembers){
		var newGameRoom;
		newGameRoom = new GameRoom(roomName,roomOwner,maxNumOfMembers);
		rooms.push(newGameRoom);
		console.log('newGameRoom:',newGameRoom);
		//return newGameRoom.getRoomId();
		return newGameRoom;
	}
	function deleteRoom(roomId){
		var i;
		//삭제할 배열 찾기.. 나중엔 쉽게 서칭하는 방법 찾기!
		for(i=0;i<rooms.length;i++){
			if(rooms[i].roomId===roomId){
				rooms.splice(i,1);//배열에서 해당 요소가 삭제됨... 더 좋은 방법 못찾음
			}
				
		}
	}
	function getRoomList(){//배열 수정가능한게 괜찮은가...
		return rooms;
	}
	//room찾기
	function getRoom(roomId){
		var i;
		for(i=0;i<rooms.length;i+=1){
			if(rooms[i].roomId===roomId){
				return rooms[i]; 
			}
			
		}
		return null;
	}
	function putUserInRoom(roomId,user){
		//배열내에서  찾기.. 나중엔 쉽게 서칭하는 방법 찾기!v
		var i;
		for(i=0;i<rooms.length;i++){
			if(rooms[i].roomId===roomId){
				rooms[i].getMembers().push(user);
				break;
			}				
		}
	}
	function letUserGoOutOfRoom(roomId,user){
		//배열내에서  찾기.. 나중엔 쉽게 서칭하는 방법 찾기!
		var i,j,members;
		for(i=0;i<rooms.length;i++){
			if(rooms[i].roomId===roomId){
				
				members = rooms[i].getMembers();
				for(j=0;j<members.length;j+=1){
					if(members[j]===user){
						members.splice(j,1);//배열에서 삭제
					}
				}
			}				
		}
	}
	//console.log('hi');
	return {
		createRoom:createRoom,
		deleteRoom:deleteRoom,
		getRoomList:getRoomList,
		putUserInRoom:putUserInRoom,
		letUserGoOutOfRoom:letUserGoOutOfRoom,
		getRoom:getRoom
	}
	
})();
//exports.room_manager ();