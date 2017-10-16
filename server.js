var http = require("http");
var fs = require("fs");
var handlers = require("./handlers");
var ss = require("./user");
var qs = require('querystring');
var md5 = require('md5');

function start(serverPort) {
	server = http.createServer(onRequest);
	server.listen(serverPort);
	console.log("Waiting for connections on port " + serverPort);
	var requestCount=0;
	var users = new Array();
	
	function onRequest(request, response) {
		requestCount++;
	
	//	console.log(request);
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
			else{
			  response.writeHead(404, {'Content-Type': 'text/plain'});
			  response.end("Nothing to see here");
			}
			
		}
		else
		if (request.method === "POST"){ 
			if (request.url === "/user") {
				var postData = "";
				request.addListener("data", function(postDataChunk) {
					postData += postDataChunk;
					if(postData.length > 1e7) {
						  response.writeHead(413, 'Request Entity Too Large', {'Content-Type': 'text/plain'});
						  response.end("POST size too large");
					}
				});

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
			else if (request.url === "/room"){
				
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

