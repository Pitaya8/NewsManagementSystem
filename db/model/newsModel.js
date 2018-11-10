const mongoose=require('mongoose');
let Schema=mongoose.Schema;

let newsSchema=new Schema({
	_id:{type:String,required:true},
	img:{type:String,required:true},
	src:{type:String,required:true},
	title:{type:String,required:true},
	type:{type:String,required:true},
	uptime:{type:String,required:true}
})

let newsmodel=mongoose.model('new',newsSchema);
module.exports=newsmodel;
