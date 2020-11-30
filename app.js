const express=require('express')
require('dotenv').config;
const route=require('./router/route')
const app=express();
const port=process.env.PORT||3000;
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }))
app.use(route);
app.listen(port,()=>console.log('running on 3000'));

