
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');
var userManager = require('./gameplatform/user_manager').user_manager,
	roomManager = require('./gameplatform/room_manager').room_manager;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
var server = http.createServer(app);

//
//var chattingServer = require('./gameplatform/chatting_server');
//console.log(chattingServer);
//chattingServer(io);
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
//http.createServer(app).listen(app.get('port'), function(){
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
var io = require('socket.io')(server);
//
io.on('connection',function(socket){
//	console.log("a socket connected",socket);
	console.log("a socket connected");
	//user 등록
	socket.on('reqRegisterUser',function(data){
		var userId;		
		userId=userManager.createUser(data.name);		
//		io.send('resRegisterUser',{msg:'creating_user_success',	userId:userId});
		socket.emit('resRegisterUser',{msg:'creating_user_success',	userId:userId});
	});
	//방목록 조회
	socket.on('reqRoomList',function(data){
		var user;
		console.log("roomlist");
		socket.emit('roomList',{msg:'',
			roomList:roomManager.getRoomList()});	
		
	});
	//방 생성
	socket.on('reqCreatingRoom',function(data){
		var user,roomInfo;
		user = userManager.getUser(data.userId);
		roomInfo = roomManager.createRoom(data.roomName,user,4);
		socket.emit('resCreatingRoom',{msg:'creating_room_success',roomInfo:roomInfo});	
		socket.join(roomInfo.roomId);
		socket.emit('roomlist',{msg:'',
			roomList:roomManager.getRoomList()});
		io.to(roomInfo.roomId).emit('chatMsg',{msg:'[room : '+data.roomName+']room was created'});
		console.log("response");
	});
	//방입장//join
	socket.on('reqEnteringARoom',function(data){
		var user,roomInfo;
		console.log('Enter Room',data);
		user = userManager.getUser(data.userId);
		socket.join(data.roomId);
		roomManager.putUserInRoom(data.roomId,user);
		roomInfo=roomManager.getRoom(data.roomId);
		//userManager.createUser(data.name);
		//입장한 방 이름 필요
		socket.emit('resEnteringARoom',{msg:'join_room_success',roomInfo:roomInfo});		
		//io.to(data.roomId).emit('chatMsg',{msg:user.getUserName()+' entered'});
		io.to(data.roomId).emit('chatMsg',{msg:user.getUserName()+' entered'});
	});
	//방퇴실
	socket.on('reqLeavingARoom',function(data){
		var user;
		
		user = userManager.getUser(data.userId);
		roomManager.letUserGoOutOfRoom(data.roomId,user);
		io.to(data.roomId).emit('chatMsg',{msg:user.getUserName()+' left'});
		socket.leave(data.roomId);
		//userManager.createUser(data.name);
		
		socket.emit('roomlist',{type:'creating_room_success',
			roomList:roomManager.getRoomList()});	
		
	});
	//메시지 전송
	socket.on('reqSendMessage',function(data){
		var user;		
		user = userManager.getUser(data.userId);
		io.to(data.roomId).emit('chatMsg',{msg:'['+user.userName+']: '+data.msg});
		socket.emit('roomlist',{type:'sending message success'});	
		console.log('roomId:',data.roomId,data)
	});
	
	
});

