require('../connection/connect');
const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
         name:{
             type:String,
         },
         location:{
             type:String,
         }
});

const model=mongoose.model('collection',userSchema);
module.exports=model;
