/*

클라이언트 시나리오

접속
1.접속(세션 처음 or 로그인)
2.방목록 요청

방입장
1.방 목록 중 1선택
2.입장 요청
3.입장

채팅
	-채팅메시지 입력
		1.사용자가 전송 
		2.입력된 텍스트 서버 전송
	-채팅메시지 수신
		1.서버측으로 부터 메시지 수신
		2.메시지 갱신

게임 시작
	1.방장권한 유저가 게임시작 버튼 클릭
		-방장권한 유저만 시작 버튼을 가지고 있음
	2.서버로 게임 시작 요청
	3.서버응답
		-게임 가능 인원(혹은 상태)이면 게임시작 메시지 수신
		-불가능할 경우 서버로 부터 메시지 수신

*/

var chatClient = (function (){
	var socket = io.connect();
	var userId, roomList, roomInfo,chatWindows ;
	
	chatWindows=document.getElementById('chatWindows');
	//roomlist 	
	socket.on('roomList',(data)=>{
		console.log(data);
		var roomListElement,i,list;
    	roomListElement = document.getElementById("roomList");
    	list= data.roomList;
    	roomList=list;
    	roomListElement.innerHTML='';
//    	roomId,roomName,roomOwner,members,maxNumOfMembers,gameStatus;
    	var roomItem;
    	for(i=0;i<list.length;i+=1){
    		roomItem = document.createElement('div');
    		roomItem.innerHTML=list[i].roomName+ 
			" "+list[i].members.length +"/ "+
			list[i].maxNumOfMembers;
    		roomItem.id=list[i].roomId;
    		roomListElement.appendChild(roomItem);
    		//roomListElement.appendChild(document.createElement('br'));
    	}
		//roomlist갱신
	});
	//생성
//	socket.emit('reqCreatingRoom',{room:roomId});
	//생성 응답
	socket.on('resCreatingRoom',(data)=>{
		roomInfo=data.roomInfo;
		console.log(data);
	});	
	//입장
	//user정보,room정보
//	socket.emit('reqEnteringARoom',{room:roomId});
	//방 입장 응답
	socket.on('resEnteringARoom',(data)=>{
		roomInfo=data.roomInfo;
		console.log(data);
	});
	//퇴실
	//user정보,room정보
//	socket.emit('reqLeavingARoom',{room:roomId});
	//방 퇴실 응답
	socket.on('resLeavingARoom',(data)=>{
		console.log(data);
	});
	
	
	
	
	//user등록
//	socket.emit('reqRegisterUser',{});
	//res
	socket.on('resRegisterUser',(data)=>{
		console.log(data.msg,data);
		userId=data.userId;
		document.getElementById("userName").disabled = true;
		document.getElementById("registerUserBtn").disabled = true;
	});
	
	//user접속
//	socket.emit('reqLoginUser',{});
	//res
	socket.on('resRegisterUser',(data)=>{
		
	});
	
	
	
	
	
	//채팅
	//user접속
//	socket.emit('reqSendMessage',{});
	//res
	socket.on('resSendMessage',(data)=>{
		
	});
	
	
	socket.on('chatMsg',(data)=>{
		console.log('new chat msg : ',data.msg,data);
		chatWindows.append(data.msg);
		chatWindows.append(document.createElement('br'));
	});
	
	//입실한 모든 요청 중에 상태인지 확인!

	//request Sending Message
	//채팅 보내진거 response필요한가..(전송확인 필요한듯??)
	//response 
	
	
	/*
	//새 메시지 수신..
	//
	function addReqRes (resMsg,callback){
		
	}
	*/
	function sendReqMsg(reqMsg,data){
		socket.emit(reqMsg,data);
	}
	function getUserId(){
		return userId;
	}
	function getRoomInfo(){
		return roomInfo;
	}
	return {
		sendReqMsg:sendReqMsg,
		socket:socket,
		getUserId:getUserId,
		getRoomInfo:getRoomInfo
	}
	
})();
var registerUserBtn = document.getElementById("registerUserBtn");
var userId;
//user 등록 버튼
registerUserBtn.addEventListener("click",function (e){
	chatClient.sendReqMsg('reqRegisterUser',{name:document.getElementById("userName").value});
	//roomController.registerUser(document.getElementById("userName").value);
});

//방 조회 버튼
var refreshRoomListBtn = document.getElementById("refreshRoomList");
refreshRoomListBtn.addEventListener("click",function (e){
	chatClient.sendReqMsg('reqRoomList',{});
	//roomController.registerUser(document.getElementById("userName").value);
});

//방 생성 버튼
var makeARoomBtn = document.getElementById("makeARoomBtn");
makeARoomBtn.addEventListener("click",function (e){
	chatClient.sendReqMsg('reqCreatingRoom',{userId:chatClient.getUserId(),
		roomName:document.getElementById("roomName").value
		});
});
//event delegation
//방선택
var roomList = document.getElementById("roomList");
roomList.addEventListener("click",function(e){
	var target = e.target || e.srcElement;
	console.log(target.id);
	chatClient.sendReqMsg('reqEnteringARoom',{userId:chatClient.getUserId(),
		roomId:target.id
		});
});
//방 입장 버튼
//사용안함
var enterRoomBtn = document.getElementById("enterRoomBtn");
enterRoomBtn.addEventListener("click",function (e){
	chatClient.sendReqMsg('reqEnteringARoom',{userId:chatClient.getUserId(),
		roomName:document.getElementById("roomName").value
		});
});
//채팅 입력
var submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click",function (e){
	chatClient.sendReqMsg('reqSendMessage',{userId:chatClient.getUserId(),
		roomId:chatClient.getRoomInfo().roomId,msg:document.getElementById("chatMessage").value
		});
	document.getElementById("chatMessage").value="";
}); 
/*
	Messages:	
		reqRoomList
		reqCreatingRoom
		reqEnteringARoom
		reqLeavingARoom
		reqRegisterUser
		reqLoginUser
		reqSendMessage
*/