const express=require('express');
const Router1=express.Router();
const newsTypemodel=require('../db/model/newsTypeModel.js');
const util=require('../utils/utli.js');
const nodemailer=require('nodemailer');


/**
 * @api {post} /news_type/newsType_list/ 查询新闻类型
 * @apiName News_type
 * @apiGroup News_type
 *
 * @apiParam {String} id 类型
 * @apiParam {String} keyword 新闻具体类型
 * 
 * @apiSuccess {String} err 错误信息
 * @apiSuccess {String} msg  返回查询信息
 */
Router1.post('/newsType_list',(req,res)=>{
	let {id,keyword}=req.body;
	if(keyword==undefined){
		newsTypemodel.find({'id':id})
		.then((data)=>{
			res.send(data)
		})
		.catch(()=>{
			res.send('查找失败')
		})
	}else{
		newsTypemodel.find({'id':id,'keyword':keyword})
		.then((data)=>{
			if(data.length>0){
				res.send(data)
			}else{
				res.send('null')
			}
		})
		.catch(()=>{
			res.send('查找失败')
		})
	}
	
})


/**
 * @api {post} /news_type/add_newsType/ 增加新闻类型
 * @apiName News_type
 * @apiGroup News_type
 *
 * @apiParam {String} id 类型
 * @apiParam {String} keyword 新闻具体类型
 * 
 * @apiSuccess {String} err 错误信息
 * @apiSuccess {String} msg  返回查询信息
 */
Router1.post('/add_newsType',(req,res)=>{
	let {id,keyword}=req.body;
	newsTypemodel.insertMany({'id':id,'keyword':keyword})
	.then((data)=>{
		res.send(data)
	})
	.catch(()=>{
		res.send('增加失败')
	})
})


/**
 * @api {post} /news_type/delet_newsType/ 删除新闻类型
 * @apiName News_type
 * @apiGroup News_type
 *
 * @apiParam {String} id 类型
 * @apiParam {String} keyword 新闻具体类型
 * 
 * @apiSuccess {String} err 错误信息
 * @apiSuccess {String} msg  返回查询信息
 */
Router1.post('/delet_newsType',(req,res)=>{
	let {id,keyword}=req.body;
	newsTypemodel.deleteOne({'id':id,'keyword':keyword})
	.then((data)=>{
		res.send('删除成功')
	})
	.catch(()=>{
		res.send('删除失败')
	})
})

/**
 * @api {post} /news_type/edit_newsType/ 修改新闻类型
 * @apiName News_type
 * @apiGroup News_type
 *
 * @apiParam {String} id 类型
 * @apiParam {String} keyword 新闻具体类型
 * 
 * @apiSuccess {String} err 错误信息
 * @apiSuccess {String} msg  返回查询信息
 */
Router1.post('/edit_newsType',(req,res)=>{
	let {id,keyword}=req.body;
	newsTypemodel.updateOne({'id':id},{$set:{'keyword':keyword}})
	.then((data)=>{
		res.send('修改成功')
	})
	.catch(()=>{
		res.send('修改失败')
	})
})
module.exports=Router1;