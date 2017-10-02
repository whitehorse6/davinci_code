
/**
 * Module dependencies.
 */

var express = require('express')
	, routes = require('./server/controller')
	, chatting = require('./server/controller/chatting')
	, user = require('./server/controller/user')
	, http = require('http')
	, path = require('path')
	, chatting_manager = require('./server/service/chatting_manager');

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


const server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

chatting_manager.chatting_manager(server);
