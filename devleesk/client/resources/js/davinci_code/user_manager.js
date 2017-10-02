$(function(){
	$("#login_button").click(function(){
		var user_id = $("#user_id").val();
		var trim_user_id = user_id.trim();
		if (trim_user_id == ""){
			alert("아이디 입력하시오.");
			$("#user_id").val("");
			$("#user_id").focus();
			return;
		}
		socket.emit('login', trim_user_id);
	})
	socket.on('login_result', (result)=>{
		if(result.return_code == 200){
			login_succes(result.return_result);
			draw_result_message("");
		}
		else if (result.return_code == 400){
			$("#user_id").focus();
			draw_result_message(result.return_message)
		}
	})
})
var draw_result_message = function(message){
	$("#return_message_area").empty();
	$("#return_message_area").append(message);
}
var login_succes = function(user_id){
	$("#login_area").hide();
	$("#game_info_area").show();
	socket.emit('get_user_list');
}
