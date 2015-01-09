var http = require('http');
var json_get = {
  "name": "midMeet",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www"
  }
}

var json_add = {
  "name":1,
  "dependencies": {
    "express": "~4.10.6",
    "body-parser": "~1.10.1",
    "cookie-parser": "~1.3.3",
    "morgan": "~1.5.1",
    "serve-favicon": "~2.2.0",
    "deb1ug": "~2.1.1",
    "jade": "~1.8.2",
    "http-proxy":"~1.4.x"
  }
}


var route = {
	'/api/get':json_get,
	'/api/add':json_add
}

http.createServer(function(req,res){
    if(route[req.url])res.writeHead(200);
	res.write(JSON.stringify(route[req.url]));
	res.end();
}).listen(4000);
