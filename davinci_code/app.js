
/**
 * Module dependencies.
 */

var express = require('express')
	, routes = require('./routes')
	, chatting = require('./routes/chatting')
	, user = require('./routes/user')
	, http = require('http')
	, path = require('path');

const socket_io = require('socket.io');

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
app.get('/chatting', chatting.chatting);
app.get('/users', user.list);


const server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

const io = socket_io.listen(server);
io.on('connection', (soc) => {
	soc.on('message_to_server', (message, room_id) => {
		io.sockets.in(room_id).emit('message_to_client', {
			code : 200,
			user_id : soc.id,
			room_id : room_id,
			result : "id[" + soc.id + "], massage - [" + message + "]"
		});
	});
	soc.on('get_room', (rooms) => {
		io.sockets.emit('room_to_client', io.sockets.manager.rooms);
	});
	soc.on('set_room', (room) => {
		soc.join(room);
		io.sockets.emit('room_to_client', io.sockets.manager.rooms);
	});
	soc.on('join_room', (room_id) =>{
		
		soc.join(room_id);
		io.sockets.in(room_id).emit('access_room_check', {
			code : 200,
			user_id : soc.id,
			room_id : room_id,
			result : "success"
		});
		io.sockets.in(room_id).emit('message_to_client', {
			code : 200,
			user_id : soc.id,
			room_id : room_id,
			result : "id[" + soc.id + ", join room[" + room_id + "]"
		});
		console.log("rooms = " + io.sockets.manager.rooms[room_id])

	});
})
