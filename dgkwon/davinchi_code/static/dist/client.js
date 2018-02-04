var socket = io('http://localhost:3121')

// 전체 공지에 대한 알람
socket.on('alarm', function(msg){
      let chatlog = $('#chat-log')
      chatlog.append("<li class='alarm chatlog'>" + msg + "</li>")
});

// 방공지에 다한 알람
socket.on('room', function(msg){
      let chatlog = $('#chat-log')
      chatlog.append("<li class='room-notice chatlog'>" + msg + "</li>")
});

// 일반 메세지
socket.on('msg', function(msg){
      let chatlog = $('#chat-log')
      chatlog.append("<li class='msg chatlog'>" + msg + "</li>")
});


$('#id-send-message').click(function(){
    const msg = $('#id-text-log').val()
    console.log(msg)
    socket.emit("msg", msg)
    $('#id-text-log').val("")
});
