/***Created by Kajnak-M Robert-O SN:2614846*/


var http = require("http");
var fs = require("fs");
var ss = require("./user");
var qs = require('querystring');
var md5 = require('md5');
var path = require('path');

function start(serverPort,wsPort) {
	server = http.createServer(onRequest);
	server.listen(serverPort);
	console.log("Waiting for connections on port " + serverPort);
	var requestCount=0;
	var users = new Array();
	var rooms = new Array();
	
	function onRequest(request, response) {
		requestCount++;
	
		console.log(request.method +" | "+request.url);
		if (request.method === "GET"){
			response.writeHead(404, {'Content-Type': 'text/html'});
			if (request.url === "/favicon.ico") {
			  response.writeHead(404, {'Content-Type': 'text/plain'});
			  response.end();
			} else if (request.url === '/' || request.url === '/index'){
				response.writeHead(200, {"Content-Type": "text/html"});
				var data = fs.readFileSync('index.html');

				fs.readFile('index.html', function (err, data) {
					if (err) return console.error(err);
					response.write(data);
					response.end();
				});
			}
			else if (request.url === "/socket.io/socket.io.js"){
				/*request.addListener("data", function(postDataChunk) {
					postData += postDataChunk;
					if(postData.length > 1e7) {
						  response.writeHead(413, 'Request Entity Too Large', {'Content-Type': 'text/plain'});
						  response.end("POST size too large");
					}
				});

				request.addListener("end", function() {
					console.log("WS requested: " + postData);
					response.writeHead(200, {'Content-Type': 'text/javascript'});
					var filePath = path.join(__dirname, "node_modules/socket.io-client/socket.io.js");
					var stat = fs.statSync(filePath);

					var readStream = fs.createReadStream("node_modules/socket.io-client/socket.io.js");
					// We replaced all the event handlers with a simple call to readStream.pipe()
					readStream.pipe(response);
				});*/
			}
			else {
			  response.writeHead(404, {'Content-Type': 'text/plain'});
			  response.end("Nothing to see here");
			  console.log("Invalid request: " + request.url);
			}
			
		}
		else
		if (request.method === "POST"){ 
			var postData = "";
			request.addListener("data", function(postDataChunk) {
				postData += postDataChunk;
				if(postData.length > 1e7) {
					  response.writeHead(413, 'Request Entity Too Large', {'Content-Type': 'text/plain'});
					  response.end("POST size too large");
				}
			});
				
			if (request.url === "/user") {
				request.addListener("end", function() {
					//handlers.route(request, response, postData);
					console.log("Post data = " + postData);
					var idData = {};
					userData = JSON.parse(postData);
					tentativeUsername = userData.username;
					if (!users[tentativeUsername]){
						idData.ID = md5(tentativeUsername);
						users[tentativeUsername] = idData.ID;
						console.log("Registering User: " + JSON.stringify(idData));
						response.writeHead(201, {'Content-Type':'text/plain'});
						response.end(JSON.stringify(idData));
					}
					else{
						console.log("Username already exists");
						response.writeHead(409, {'Content-Type':'text/plain'});
						response.end();
					}
				});
			}
			else if (request.url === "/rooms"){
				request.addListener("end", function() {
					console.log("Post data = " + postData);
					var serverName = {};
					serverName = JSON.parse(postData);
					tentativeServerName = serverName.chatroom;
					
					var roomurl ={url:"ws://localhost:"+wsPort + "rooms/"+tentativeServerName};
					//roomJS.start(server,wsPort);

					if (!rooms[tentativeServerName]){
						rooms[tentativeServerName] = serverName.chatroom;
						//console.log("Registering User: " + JSON.stringify(idData));
						response.writeHead(201, {'Content-Type':'text/plain'});
					}
					else{
						console.log("Server Name already exists. Rerouting");
						response.writeHead(200, {'Content-Type':'text/plain'});
					}
						response.end(JSON.stringify(roomurl));
				});
			}
		}
		else{
			console.log("Non POST/GET request detected");
		}
	}

	
	function writeIT(){
		this.innerHTML = "IT";
	}
}
exports.start = start;

