const mongoose=require('mongoose');
let Schema=mongoose.Schema;

let userSchema=new Schema({
	us:{type:String,required:true},
	pass:{type:String,required:true}
})

let usermodel=mongoose.model('user',userSchema);
module.exports=usermodel;
