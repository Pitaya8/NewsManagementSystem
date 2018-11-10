const express=require('express');
const Router1=express.Router();
const newsModel=require('../db/model/newsModel.js');
const util=require('../utils/utli.js');
const nodemailer=require('nodemailer');

/**
 * @api {post} /news/news_list/ 查询新闻信息
 * @apiName News
 * @apiGroup News
 *
 * @apiParam {String} keyword 每条新闻的id名
 * 
 * @apiSuccess {String} err 错误信息
 * @apiSuccess {String} msg  返回查询信息
 */
Router1.post('/news_list',(req,res)=>{
	let {_id,title}=req.body;
	//判断是否有关键字
	if(_id==undefined){
		if(title==undefined){
			newsModel.find()
			.then((data)=>{
				res.send(data)
			})
			.catch(()=>{
				res.send('查找失败')
			})
		}else{
			newsModel.find({"title": {$regex: title, $options:'i'}})
			.then((data)=>{
				res.send(data)
			})
			.catch(()=>{
				res.send('查找失败')
			})
		}
		
	}else{
		newsModel.find({'_id':_id})
		.then((data)=>{
			res.send(data)
		})
		.catch(()=>{
			res.send('查找失败')
		})
	}
})



/**
 * @api {post} /news/add_news/ 插入新闻
 * @apiName News
 * @apiGroup News
 *
 * @apiParam {String} _id 新闻的id名
 * @apiParam {String} img 新闻的图片
 * @apiParam {String} src 新闻的链接
 * @apiParam {String} title 新闻的标题
 * @apiParam {String} type 新闻的类型
 * @apiParam {String} uptime 新闻的更新事件
 * 
 * @apiSuccess {String} err 错误信息
 * @apiSuccess {String} msg  返回是否插入成功
 */
Router1.post('/add_news',(req,res)=>{
	let {_id,img,src,title,type,uptime}=req.body;
	console.log({_id,img,src,title,type})
	newsModel.insertMany({'_id':_id,'img':img,'src':src,'title':title,'type':type,'uptime':uptime})
	.then((data)=>{
		console.log(data);
		res.send('插入成功');
	})
	.catch((err)=>{
		
		res.send(err);
	})
})

/**
 * @api {post} /news/edit_news/ 修改新闻
 * @apiName News
 * @apiGroup News
 *
 * @apiParam {String} _idd 新闻的旧id名
 * @apiParam {String} _id 新闻的id名
 * @apiParam {String} img 新闻的图片
 * @apiParam {String} src 新闻的链接
 * @apiParam {String} title 新闻的标题
 * @apiParam {String} type 新闻的类型
 * @apiParam {String} uptime 新闻的更新事件
 * 
 * @apiSuccess {String} err 错误信息
 * @apiSuccess {String} msg  返回是否插入成功
 */
Router1.post('/edit_news',(req,res)=>{
	let {_id,img,src,title,type,uptime}=req.body;
	newsModel.updateOne({'_id':_id},{$set:{'_id':_id,'img':img,'src':src,'title':title,'type':type,'uptime':uptime}})
	.then((data)=>{
		console.log(data);
		res.send('修改成功');
	})
	.catch((err)=>{
		console.log(err)
		res.send('修改失败');
	})
})


/**
 * @api {post} /news/delet_news/ 删除新闻
 * @apiName News
 * @apiGroup News
 *
 * @apiParam {String} _id 新闻的id名
 * 
 * @apiSuccess {String} err 错误信息
 * @apiSuccess {String} msg  返回是否插入成功
 */
Router1.post('/delet_news',(req,res)=>{
	let {_id}=req.body;
	newsModel.deleteOne({'_id':_id})
	.then((data)=>{
		console.log(data);
		res.send('删除成功');
	})
	.catch((err)=>{
		console.log(err)
		res.send('删除失败');
	})
})


/**
 * @api {post} /news/paging_news/ 新闻信息分页
 * @apiName News
 * @apiGroup News
 *
 * @apiParam {String} numbers 每页几条数据
 * @apiParam {String} page 第几页
 * 
 * @apiSuccess {String} err 错误信息
 * @apiSuccess {String} msg  返回信息
 */
Router1.post('/paging_news',(req,res)=>{
	let {numbers,page}=req.body;
	newsModel.find().limit(Number(numbers)).skip(Number(page*numbers))
	.then((data)=>{
		return res.send(data)
	})
	.catch((data2)=>{
		return res.send('查找失败')
	})
})
module.exports=Router1;