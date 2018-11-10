const mongoose=require('mongoose');
let Schema=mongoose.Schema;

let newsTypeSchema=new Schema({
	id:{type:String,required:true},
	keyword:{type:String,required:true}
})

let newsTypemodel=mongoose.model('newsType',newsTypeSchema);
module.exports=newsTypemodel;
