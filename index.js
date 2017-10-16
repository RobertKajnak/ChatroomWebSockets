var server = require("./server");
server.start(process.argv[2]);


/*var http = require("http"), fs=require("fs");


http.createServer(function (request, response) {
   // Send the HTTP header 
   // HTTP Status: 200 : OK
   // Content Type: text/plain
   response.writeHead(200, {'Content-Type': 'text/plain'});
	var data = fs.readFileSync('input.txt');

	fs.readFile('input.txt', function (err, data) {
	   if (err) return console.error(err);
	   response.write(data.toString());
   response.end('Hello World\n');
	});
   // Send the response body as "Hello World"
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');*/