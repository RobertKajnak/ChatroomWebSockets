/*
function start(httpServer, wsocket){
	var io = require('socket.io');
	var http = require('http');
	var server = http.createServer(function(request, response){
		
	});
	server.listen(wsocket);
	var socket = io.listen(server);
	
	console.log("Attempting to create connection");
	socket.on('connection', function(socket){
		console.log('a user connected');
		socket.on('disconnect', function(){
		console.log('user disconnected');
		});
	});
}
*/

function start(httpServer, wsocket){
}
exports.start = start;