var http = require('http');
var fs = require('fs');
var socketio = require('socket.io')

var server = http.cerateServer(function(req, res){
        fs.readfile('index.html', function(err, data) {
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
        });
}).listen(8008, fucntion() {
    console.log('Running ~~~~~~~~~~~~');
});

var io = socketio.listen(server);
io.sockets.on('connection', function(socket){
        socket.on('sMsg', function(data){
            io.sockets.emit('rMsg', data);
    });
 });

