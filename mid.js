
var Diff = require('./diff.js');
var http = require('http');
var fs = require('fs');
var MidMeet = function(obj,cb){
	var diff= new Diff();
	var buf = fs.readFileSync(obj['file'],"utf8");
	var str = buf.toString();
	var out = diff.exec(str);
	var opt = {
		host:obj['host'],
		port:obj['port']
	};
	out.forEach(function(itm){
		opt.path = itm.api;
		opt.method = itm.method;
		var jsonSrc = JSON.parse(itm.cnt);
		var resData = [];
		var req = http.request(opt,function(res){
			res.on('data',function(chunck){
				resData.push(chunck);
			});
			res.on('end',function(){
				jsonTarget = JSON.parse(resData.join());
				if(!diff.reserval(jsonSrc,jsonTarget)){
                    diff.result.unshift("API:\t  "+itm.api);
                    diff.result.unshift("Name:\t  "+itm.name);
                    cb(diff.result.join('\n'));
                    cb("JSON-Front:");
                    cb(JSON.stringify(jsonSrc,null,4));
                    cb("JSON-End:");
                    cb(JSON.stringify(jsonTarget,null,4));
				}
			})
		});
		req.end();
	})
}

var run = function(file,host,port){
	fs.openSync('result', 'w');
	var writeStream = fs.createWriteStream('result');
	console.log(file+host+port);
	mid = new MidMeet({file:file,host:host,port:port},function(str){
		writeStream.write(str+'\n');
	});
}

module.exports = {
	run:run
}
