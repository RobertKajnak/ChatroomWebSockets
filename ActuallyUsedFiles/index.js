/***Created by Kajnak-M Robert-O SN:2614846*/


var server = require("./server");
server.start(process.argv[2],process.argv[3]);


// Setup basic express server
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');

var room = {};

app.get('/', function(req, res){
	res.sendFile(__dirname + '/chat.html');
});
app.get('/rooms/:room/user/:user', function(req, res){
	room = req.params;
	fs.readFile('chat.html', function (err, data) {
		data = data.toString().replace("<uname>",room.user).replace("<room>",room.room);
		res.writeHead(200, {"Content-Type": "text/html"});
		res.write(data);
		res.end();
	});
	//res.sendFile('chat.html');
	//res.sendFile(__dirname + '/chat.html');
});


io.on('connection', function(socket){
	console.log('A user has connected');
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
	
	socket.on('subscribe', function(room) { 
        console.log('joining room', room);
        socket.join(room); 
    });

    socket.on('unsubscribe', function(room) {  
        console.log('leaving room', room);
        socket.leave(room); 
    });

    socket.on('send', function(data) {
        console.log('sending message in:' + data.room + " : " + data.message);
        io.sockets.in(data.room).emit('message', data.message);
    });
});

http.listen(process.argv[3], function(){
  console.log("Listening on :" + process.argv[3]);
});
    
