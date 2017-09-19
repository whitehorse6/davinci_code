
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
		console.log("aaa" + data);
		soc.emit('message', data);
	});
})
