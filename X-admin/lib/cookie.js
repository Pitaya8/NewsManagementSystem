// 设置cookie
function setCookie(cookieName, cookieValue, date, path){
	// 包装数据
	var data = {
		"val" : cookieValue
	}
	// 编码
	var str = cookieName+"="+encodeURIComponent(JSON.stringify(data));
	// 过期时间
	if( date ){
		var dt = new Date();
		dt.setDate(dt.getDate()+date);
		str += ";expires="+dt.toGMTString();
	}
	// path属性
	if( path ){
		str += ";path="+path;
	}
	// 设置cookie
	document.cookie = str;
}

// 获取cookie
function getCookie(cookieName, callback){
	var type = typeof(cookieName);  // "string" or "object"
	var str = decodeURIComponent(document.cookie);//str="b={"val":2}; c=3; a=1"
	var arr = str.split("; ");//arr=["b=2","c=3","a=1"]
	for( var i=0,len=arr.length; i<len; i++ ){
		var tmp = arr[i];	// 当i=0时，tmp="b={"val":2}"
		var ind = tmp.indexOf("=");
		var _name = tmp.substring(0, ind);
		var _value = tmp.substring(ind+1);
		var val = JSON.parse(_value).val;
		if( type=="string" ){
			if( cookieName==_name ){
				return val;
			}
		}else if( type=="object" ){
			if( cookieName.test(_name) && callback ){
				callback(_name, val);
			}
		}
	}
}
