const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/demo',{useNewUrlParser:true});

//连接数据库
let db=mongoose.connection;

//创建数据库对象
db.on('error',function(err){
	console.log('connection error:'+err);
})

//监听数据库连接错误
db.on('open',function(){
	console.log("we're connected!");
})
db.on('disconnected',function(){
	console.log('数据库连接断开');
})
