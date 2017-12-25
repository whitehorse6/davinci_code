/**
 * http://usejsdoc.org/
 */
var socket = io.connect();
var roomController = (function(){
    // socket.io 서버에 접속한다   
    //socket.connect();
    
    //user 접속
    function registerUser(name,callback){
    	console.log("registerUser:"+name);
    	
    	socket.emit("register_user", {
    	      // name: "ungmo2",
    	      name: name
    	      
    	});
    }
    function createRoom(roomName,userId,callback){
    	socket.emit("register_room", {
  	      // name: "ungmo2",
	  	    roomName: roomName,
	  	    userId:userId
	  	    
	  	});
    }
    function requestRoomList(roomName,callback){
    	socket.emit("register_room", {
  	      // name: "ungmo2",
	  	    name: roomName
	  	      
	  	});
    }
    function joinRoom(userId,roomId,callback){
    	
    }
    function exitRoom(userId,roomId,callback){
    	
    	
    };
    
    function setRoomsList(list){
    	var roomListElement,i;
    	roomListElement = document.getElementById("roomlist");
//    	roomId,roomName,roomOwner,members,maxNumOfMembers,gameStatus;
    	for(i=0;i<list.length;i+=1){
    		roomListElement.append(list[i].roomName+ 
    				" "+list[i].members.length +"/ "+
    				list[i].maxNumOfMembers 
    				);
    		roomListElement.append(document.createElement('br'));
    	}
    }
    /*
    setRoomsList([{roomId:123,roomName:"MangAJi",roomOwner:"ugi",members:["ugi","1","2"],maxNumOfMembers:4,gameStatus:"stared"}
    ,{roomId:123,roomName:"MangAJi",roomOwner:"ugi",members:["ugi","1","2"],maxNumOfMembers:4,gameStatus:"stared"}]);
    */
    return {
    	registerUser:registerUser,
    	createRoom:createRoom,
    	setRoomsList:setRoomsList
    };
  })();
var registerUserBtn = document.getElementById("registerUserBtn");
var userId;

//버튼
registerUserBtn.addEventListener("click",function (e){
	roomController.registerUser(document.getElementById("userName").value);
	socket.on('myresponse', function(msg){
		console.log(msg);
		if(msg.type==='creating_user_success'){
			document.getElementById("userName").disabled = true;
			document.getElementById("registerUserBtn").disabled = true;
			userId=msg.userId;
			console.log(userId);
			registerUserBtn.disabled =true;
		}
	});
	

});
//방생성 버튼
var makeARoomBtn = document.getElementById("makeARoomBtn");
makeARoomBtn.addEventListener("click",function (e){
	//roomController.registerUser();
	roomController.createRoom(document.getElementById("roomName").value,userId);
	console.log("room");
	socket.on('roomlist', function(msg){
		console.log(msg);
		if(msg.type==='creating_room_success'){
			console.log(msg.roomList)
			roomController.setRoomsList(msg.roomList);
			registerUserBtn.disabled =true;
		}
	});
});
