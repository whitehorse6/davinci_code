// var http = require('http');
// var fs = require('fs');
// var socketio = require('socket.io')
//
// var server = http.createServer(function(req, res){
//         fs.readFile('index.html', function(err, data) {
//             res.writeHead(200, {'Content-Type':'text/html'});
//             res.end(data);
//         });
// }).listen(8080, function() {
//     console.log('Running ~~~~~~~~~~~~');
// });
//
// var io = socketio.listen(server);
// io.on('connection', function(socket){
//      socket.on('ferret', (name, fn) => {
//        console.log(name, fn)
//        fn('woot');
//   //    });
//   //  });
//         // socket.on('sMsg', function(data){
//         //     console.log("is_go?")
//         //     console.log(data)
//         //     io.sockets.emit('rMsg', data);
//     });
//  });
//  // server:
//  //  io.on('connection', (socket) => {
//  //    socket.on('ferret', (name, fn) => {
//  //      fn('woot');
//  //    });
//  //  });
var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(8080);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200, {'Content-Type':'text/html'});
    res.end(data);
  });
}

io.on('connection', function (socket) {
  console.log("is_connected")
  // room join
  socket.on('join', function(data){
    socket.join(data.roomname);
    socket.set('room', data.roomname);
    socket.get('room', function(error, room){
        io.in(room).emit('join');
        console.log("Join done");
    });
  });
  // message
  socket.on('sMsg', function (data) {
    console.log("this is get data")
    console.log(data);
    io.emit('rMsg', data)
  });
});
