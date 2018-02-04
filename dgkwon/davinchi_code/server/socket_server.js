
module.exports = {
      socket_server: (server, io, listening_port) => {
        server.listen(listening_port);
        console.log("socket server is started at ("+listening_port +")")

        // 방 목록
        // 이부분을 DB화 하고 방 ID를 DB로 부터 실시간으로 Update하는 코드를 만들면 될듯.
        var rooms = ["first", "second"]

        // 누군가 접속 하였을때 핸들러
        io.on('connection', function(socket){
          // 기본 옵션
          io.emit("alarm", "New people is joined!") // 사람이 들어 왔음을 알리는 전체 공지
          socket.on("alarm", function(msg){
              io.emit("alarm", msg)
              console.log("sendmessage : " +msg)
          }); // 특정 시스템에서 공지가 날아올경우 반영 (그냥 만들어봄)
          console.log('a user connected');

          // 방 설정 ( 이부분은 추후 분리 되어야 함 )
          // Question 여기서 소스코드가 분리 될 경우 Room을 클릭할때 해당 Socket을 찾아서
          // 입력하는 방법은 어떻게 하여야 하는가?
          // 대안 1. 로그인 기능을 구현 후 Session 관리하는 방법이 있지 않을까?
          //     -> 의문점. 나갔다 들어오면 새로운 Socket이 등록된다. 이떄는...?
          //     -> 해본진 않음. 생각으로는 왠지... DB에 User의 Socket 정보를 들고있다가 업데이트
          //        이렇게 될경우 주기적으로 일정 시간 이상 반응이 없던 친구들은 세션을 종료시키고
          //        요청을 다시만약 날리면 그때 세션 정보를 업데이트 해줘야 한다.
          //        서버단에서 Status 업데이트 때 마다 ack를 날려 상황을 업데이트 할 수 있으나
          //        서버단에 부담이 되지 않는지는 체크해야됨.
          //

          // 일단은 방 목록을 랜덤으로 가져옴.
          // 이부분을 특정 방 버튼을 눌렀을때 방 번호를 서버에서 받아와
          // 이를 처리하는 로직으로 변경하면 될듯
          const room_no = Math.floor(Math.random()*2)
          var room = rooms[room_no]   // 일단은 방 목록에서 랜덤으로 방을 가져옴
          console.log("his room is " + room + ", " + room_no);
          socket.join(room) // 드디어 방으로 들어옴 !!

          // 방에 새로운 사람이 들어왔음을 공지
          io.to(room).emit("room", "dgkwon joins this room! '" + room + "'")
          // 방 공지사항이 들어올 경우 방사람들에게만 전달
          socket.on('room', function(msg){
              io.to(room).emit("room", msg);
          })

          // 일반 체팅 -> 역시 방 사람들에게만 전달
          socket.on('msg', function(msg){
            io.to(room).emit("msg", msg);
          });

          // 추가 의견
          // 위와 같이 방별, 전체 알람을 분리할 수 있고,
          // 거기다 Tag를 추가하면,
          // 시스템 분리 없이 게임, 체팅, 방 관리를 하나의 Socket으로 관ㄹ리 할 수 있게 된다.
          // 하지만 이렇게 할 경우 동접자 100명만 넘어가도 포트가 폭주가 일어날거같지만.
          // 우리가 시스템 만들건 아니잖아.. ?

        });
      }
};
