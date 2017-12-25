//일단 app.js에서 개발하기 
exports = (function(){
	var path =require('path');
	var process = require('process');
	var fs = require('fs');
	console.log(process.cwd())
	//room 생성 요청
	console.log("started chatting server");
	console.log(fs.existsSync('./gameplatform')); 
	//console.log(fs.existsSync('./gameplatform/user_manager'));
	fs.readdir('./gameplatform',function(err,list){
		console.log("file",list);
		list.forEach(function(file){
			fs.stat('./gameplatform/'+file,function(err, stat){ 
				if(err) throw err; 
				console.log('file : '+file); 
				console.log('isFile : '+stat.isFile()+' , isDir : '+stat.isDirectory());
			});
		});
	});
	var userManager = require('./gameplatform/user_manager').user_manager,
	roomManager = require('./gameplatform/room_manager').room_manager;

	//requestRoomList
	//room list요청
	
	//room 입장 요청
	//room 퇴실 요청
	//메시지 전송 요청
		//-room에 따라서
	//메시지 보내기 
	
	
	return {
		
	}
})();