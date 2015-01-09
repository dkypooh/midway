var keys = function(obj){
	var res = [];
    for (var key in obj){
		if(!obj.hasOwnProperty(key)) continue;
    	res.push(key);		
    } 
    return res;
}

var isArray = function(xs){
	return Object.prototype.toString.call(xs) === '[object Array]';
}

var isObject = function(xs){
	return Object.prototype.toString.call(xs) === '[object Object]';
}

var typeOf = function(xs){
	var str = Object.prototype.toString.call(xs);
	return str.substring(8,str.length-1);
}


module.exports = {
	keys:keys,
	isArray:isArray,
	typeOf:typeOf
}