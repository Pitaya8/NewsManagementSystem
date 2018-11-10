const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const db=require('../db/dbconnect.js');
const path=require('path');

//post 参数解析
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//静态文件开启
app.use('/admin',express.static(path.join(__dirname,'../X-admin')));

//router
const user=require('../router/user.js');
const news=require('../router/news.js');
const news_type=require('../router/news_type.js');

app.use('/api/use',user);
app.use('/api/news',news);
app.use('/api/news_type',news_type)

app.listen(4000,()=>{
	console.log('server start in port'+3000);
})
