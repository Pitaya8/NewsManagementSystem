const express=require('express');
const Router=express.Router();
const userModel=require('../db/model/userModel.js');
//const mail=require('./mail.js');
const util=require('../utils/utli.js');
const nodemailer=require('nodemailer');

//发验证码
let transporter=nodemailer.createTransport({
	service:'qq',
	port:465,
	secure:true,
	auth:{
		user:"296044893@qq.com",
		pass:'bslkmexcmurecajd'
	}
})

function sendmail(mail,msg){
	return new Promise((resolve,reject)=>{
		console.log(mail)
		let mailOptions={
			from:'296044893@qq.com',
			to:mail,
			subject:'XX管理系统邮箱验证',
			text:msg
		}
		transporter.sendMail(mailOptions,(error,info)=>{
			if(error){reject(error)}
			resolve('OK');
		})
	})
}

/**
 * @api {post} /admin/code/ 发送验证码
 * @apiName Login_code
 * @apiGroup User
 *
 * @apiParam {String} us 用户邮箱
 * @apiParam {String} pass 用户密码
 * 
 * @apiSuccess {String} err 错误信息
 * @apiSuccess {String} msg  是否发送成功
 */
Router.post('/code',(req,res)=>{
	let {us,pass}=req.body;
	//判断用户名是否填写
	if(!us||us==""){
		return res.send(util.sendData(-1,'参数错误',null))
	}
	let num1=(parseInt(Math.random(0,1)*1000)).toString(); //随机验证码
	//发送验证码
	sendmail(us,num1)
	.then((resolve)=>{
		obj[us]=num1; //保存验证码信息   obj['296044893@qq.com','998']
		res.send(util.sendData(0,'验证码已发送',null))
	})
	.catch((err)=>{
		console.log(err)
		res.send(util.sendData(-1,'验证码发送失败',null))
	})
})

/**
 * @api {post} /admin/login/ 管理员登陆
 * @apiName Login_user
 * @apiGroup User
 *
 * @apiParam {String} us 用户邮箱
 * @apiParam {String} pass 用户密码
 * @apiParam {String} code 验证码
 * 
 * @apiSuccess {String} err 错误信息
 * @apiSuccess {String} msg  是否匹配成功
 */
let obj={}
Router.post('/login',(req,res)=>{
	let {us,pass,code}=req.body;
	userModel.find({us,pass})
	.then((data)=>{
		console.log('data:'+data);
		if(data.length>=1){
			//判断验证码
			if (obj[us]!==code) { 
				return res.send(util.sendData(-1,'验证码错误',null));
			}
			return res.send('登录ok')
		}
		res.send('账号/密码错误');
	})
})

/**
 * @api {post} /admin/add_admin/ 添加管理员
 * @apiName Login_code
 * @apiGroup User
 *
 * @apiParam {String} us 用户邮箱
 * @apiParam {String} pass 用户密码
 * 
 * @apiSuccess {String} err 错误信息
 * @apiSuccess {String} msg  是否添加成功
 */
Router.post('/add_admin',(req,res)=>{
	let {us,pass}=req.body;
	userModel.find({us})
	.then((data)=>{
		if(data.length>0){
			return res.send('该账号已存在')
		}
		userModel.insertMany({us,pass})
		.then((data1)=>{
			console.log(data1)
			return res.send('添加成功')
		})
		.catch((data2)=>{
			return res.send('添加失败')
		})
	})
})

/**
 * @api {post} /admin/search_admin/ 查找管理员信息
 * @apiName Login_search_admin
 * @apiGroup User
 *
 * @apiSuccess {String} err 错误信息
 * @apiSuccess {String} msg  显示管理员信息
 */
Router.post('/search_admin',(req,res)=>{
	let us=req.body.us;
	if(us==undefined){
		userModel.find()
		.then((data)=>{
			return res.send(data)
		})
		.catch((data2)=>{
			return res.send('查找失败')
		})
	}else{
		userModel.find({'us':us})
		.then((data)=>{
			return res.send(data)
		})
		.catch((data2)=>{
			return res.send('查找失败')
		})
	}
	
})


/**
 * @api {post} /admin/edit_admin/ 修改管理员信息
 * @apiName Login_search_admin
 * @apiGroup User
 *
 * @apiParam {String} usu 用户旧邮箱
 * @apiParam {String} uss 用户邮箱
 * @apiParam {String} passs 用户密码
 * 
 * @apiSuccess {String} err 错误信息
 * @apiSuccess {String} msg  显示管理员信息
 */
Router.post('/edit_admin',(req,res)=>{
	let {usu,uss,passs}=req.body;
	userModel.updateOne({us:usu},{$set:{us:uss,pass:passs}})
	.then((data)=>{
		return res.send('更改成功')
	})
	.catch((data2)=>{
		return res.send('更改失败')
	})
})

/**
 * @api {post} /admin/delet_admin/ 删除管理员信息
 * @apiName Login_delet_admin
 * @apiGroup User
 *
 * @apiParam {String} us 用户邮箱
 * 
 * @apiSuccess {String} err 错误信息
 * @apiSuccess {String} msg  返回信息
 */
Router.post('/delet_admin',(req,res)=>{
	let {us}=req.body;
	userModel.deleteOne({'us':us})
	.then((data)=>{
		console.log('删除了')
		return res.send('删除成功')
	})
	.catch((data2)=>{
		return res.send('删除失败')
	})
})

/**
 * @api {post} /admin/paging_admin/ 管理员信息分页
 * @apiName Login_paging_admin
 * @apiGroup User
 *
 * @apiParam {String} numbers 每页几条数据
 * @apiParam {String} page 第几页
 * 
 * @apiSuccess {String} err 错误信息
 * @apiSuccess {String} msg  返回信息
 */
Router.post('/paging_admin',(req,res)=>{
	let {numbers,page}=req.body;
	userModel.find().limit(Number(numbers)).skip(Number(page*numbers))
	.then((data)=>{
		return res.send(data)
	})
	.catch((data2)=>{
		return res.send('查找失败')
	})
})
module.exports=Router;