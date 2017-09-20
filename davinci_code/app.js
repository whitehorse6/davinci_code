
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
app.set('port', process.env.PORT || 3004);
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
	soc.on('message', (data) => {
		console.log("id - " + soc.id);
		console.log("massage - " + data);
		soc.emit('message', "id - " + soc.id + "    massage - " + data);
	});
	soc.on('req_room_list', (rooms) => {
		console.log(rooms);
		soc.emit('res_rooms', io.sockets.manager.rooms);
	});
	soc.on('room_make', (room) => {
		soc.join(room);
	});
	soc.on('req_rooms', (room) => {
		soc.emit('res_rooms', io.sockets.manager.rooms);
	});
})
