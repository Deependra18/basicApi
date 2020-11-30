require('dotenv').config;
const express=require('express');
const Users=require('../model/loc');

const router=express.Router();

//home page
router.get('/',(req,res)=>{
  res.render("home",{success:" "});
});

//for showing the form for inserting the record
router.get('/showform',(req,res)=>{
    res.render("show-form");
});


//for searching the all record 
router.get('/searchRecord',(req,res)=>{
  res.render('search');
})

// for reading the whole available  data in collection
router.get('/records',async(req,res)=>{
    const allUser=await Users.find({});
      if(!allUser)
      return res.render('welcome',{message:"Record Not found"});
      if(!allUser.length)
      return res.render('welcome',{message:"Now there is no record present please insert a record"});
      // return res.send(allUser);
      res.render('getdata.ejs', {data : allUser});
})

// for inserting the data
router.post('/insert',async(req,res)=>{
    const nooffield=Object.keys(req.body).length
    // if any hacker wants to hack my app then hacker can not provide extra field for dummy data 
            if(nooffield!=2)
            return res.render('welcome',{message:"you are not allowed to enter more than 2 field"});
             else
             {
            //  for converting the whole entereddata into the lowercase so that  for searching db will be easy
             const arr=Object.keys(req.body);
           
             arr.forEach((data)=>req.body[data]=req.body[data].toLowerCase());
             if(!req.body.name && !req.body.location)
             return res.render('welcome',{message:"please provide  data atleast one data for inesrting the record"});
             }
    try{
      const {name,location}=req.body;
              const ispresent= await Users.findOne({name,location});
              console.log(ispresent);
              if(ispresent)
            return res.render('welcome',{message:"the data is already present no need to insert again"});

      const user=await Users.create({ name,location});
      if(user)
      return res.render('welcome',{message:"Data has been successfully inserted"});
      else
      return res.render('welcome',{message:"Something went wront"});
    }
    catch(e)
    {
      return res.render('welcome',{message:e});
    }
    

});


//for searching the recorded data 
router.post('/search',async(req,res)=>{
    const allowedSearch=["name","location"];
    const wantSearch=Object.keys(req.body);
    const isValid=wantSearch.every((search)=>allowedSearch.includes(search));
    if(!isValid)
    return res.render('welcome',{message:"Invalid Search! or provide any valid field for searching"});
    try{
          wantSearch.forEach((data)=>req.body[data]=req.body[data].toLowerCase());
          if(!req.body.name && !req.body.location)
          return res.render('welcome',{message:"please provide  data atleast one data"});
          const {name,location}=req.body;
            console.log(name,location);
            if(name && location)
            var user=await Users.findOne({name,location}).exec();
            else if(name)
            var user=await Users.findOne({name}).exec();
            else
            var user=await Users.findOne({location}).exec();

          // console.log(user);
          if(!user)
          return res.render('welcome',{message:"record not found"});
          else
          return res.render('getdata.ejs', {data :[user]});
    }
    catch(e)
    {
      return res.render('welcome',{message:e});
    }

})


//exporting all routes for using in app.js
module.exports=router;