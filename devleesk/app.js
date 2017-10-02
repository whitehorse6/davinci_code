
/**
 * Module dependencies.
 */

var express = require('express')
	, http = require('http')
	, path = require('path')
	
	, routes = require('./server/controller')
	, chatting = require('./server/controller/chatting')
	, user = require('./server/controller/user')
	, davinci_code = require('./server/controller/davinci_code/davinci_code')
	, chatting_manager = require('./server/service/chatting_manager')
	
	, user_manager = require('./server/service/davinci_code/user_manager')
	, channel_manager = require('./server/service/davinci_code/channel_manager')
	, room_manager = require('./server/service/davinci_code/room_manager')
	
	, USER_LIST = require('./server/model/USER_LIST')
//	, RESULT = require('./server/model/RESULT')
	
	
	;

var app = express();


// all environments
app.set('port', process.env.PORT || 3003);
app.set('views', __dirname + '/client/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'client/resources')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/chatting', chatting.chatting);
app.get('/users', user.list);
app.get('/davinci_code', davinci_code.main);


const server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

const socket_io = require('socket.io');
const io = socket_io.listen(server);
chatting_manager.chatting_manager(server, io);

global.user_list = new USER_LIST.USER_LIST();

user_manager.user_manager(server, io);
channel_manager.channel_manager(server, io);
room_manager.room_manager(server, io);