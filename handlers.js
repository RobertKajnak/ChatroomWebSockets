function one() {
return "This is start handler ONE";
}
function two() {
return "This is start handler TWO";
}

var handle = {}
handle['/'] = one;
handle['/one'] = one;
handle['/two'] = two;

function route(path) {
	if (path in handle)
		return handle[path]()
	else
		return "Path "+path+" not handled";
}
exports.route = route;