
var util = require('./util.js');
var fs = require('fs');
var Diff = function(){
}
Diff.prototype.reserval = function(json1,json2){
    this.result = [];
    this.flag = true;
	var type1 = util.typeOf(json1);
	var type2 = util.typeOf(json2);
	if(type1 !== type2){
		this.result.push('root');
		this.flag = false;
		return;
	}else{
		switch(type1){
			case 'Object':
				this.objDiff(json1,json2);
				break;
			case 'Array':
				this.arrObj("root",json1,json2);
				break;
			default:
				break;
		}	
	}

	return this.flag;
}

Diff.prototype.objDiff = function(obj1,obj2){ //如果是对象遍历对象
	for(var key in obj1){
		if(!(key in obj2)){
			this.flag = false;
			this.result.push("J-Req key:"+key);
			continue;
		}else{
			var type1 = util.typeOf(obj1[key]);
			var type2 = util.typeOf(obj2[key]);
			if(type1 !== type2){	
				this.result.push("JSON type:"+type1+'\t'+type2);
			}else{
				switch(type1){
					case 'Object':
						this.objDiff(obj1[key],obj2[key]);
						break;
					case 'Array':
						this.arrDiff(key,obj1[key],obj2[key]);
						break;
					default:
						break;
				}
			}
		}
	}
};

Diff.prototype.arrDiff = function(key,arr1,arr2){
	var type1 = util.typeOf(arr1[0]);
	var type2 = util.typeOf(arr2[0]);
	if(type1 !== type2){
		this.flag = false;	
		this.result.push("J-Req key:"+key);
	}else{
		switch(type1){
			case 'Object':
				this.objDiff(arr1[0],arr2[0]);
				break;
			case 'Array':
				this.arrDiff(key,arr1[0],arr2[0]);
				break;
			default:
				break;
		}
	}
}

Diff.prototype.exec = function(str){
	var regExp = /<json[^>]*>([\s\S]*?)<\/json>/g, //提取biao'
		regExp1 = /<json\s+name=[\"'](.*)[\"']\s+api=[\"'](.*)[\"']\s+method=[\"'](.*)[\"']>/g
		fg = null,attr = [],out = [];
	while((fg=regExp.exec(str))!=null){
		attr = regExp1.exec(fg[0]);
		out.push({
			api:attr[2],
			name:attr[1],
			cnt:fg[1],
			method:attr[3]
		})
//		console.log(attr[3])
	}
	return out;
}

module.exports = Diff;