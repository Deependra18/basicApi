const mongoose=require('mongoose');
require('dotenv').config();
const uri=process.env.MONGO_URI;
mongoose.connect(uri,
{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})
.then(()=>console.log("db connceted"))
.catch((e)=>console.log("some error in connction to db",e))
