const express=require("express");
const User =require('../models/user')
const mongoose=require('mongoose');
const Db=require('../db')
const mongodb=require('mongodb');
const db=Db();
const router=express.Router();
var alert=require('alert');


//Home page route
router.get('/',(req,res)=>{
    db.collection('users').find().toArray()
    .then((value)=>{
       res.render('index',{
        title:"Home page",
        alert:false,
        user:value
       })
})
});

//Inserting and displaying route

router.post('/add',(req,res)=>{
    const {name,email,phone,password}=req.body;
    const user=new User({
        name:name,
        email:email,
        phone:phone,
        password:password
    });
    
    user.save().then(()=>{console.log("Data was inserted");

    db.collection('users').find().toArray()
    .then((value)=>{
       res.render('index',{
        title:"Home page",
        alert:false,
        user:value
       })
    })
    

}).catch(()=>console.log("Data was correpted"));
})

//Delete router

router.get('/deleteData',(req,res)=>{
    const{id}=req.query;
   db.collection('users').deleteOne({"_id":new mongodb.ObjectId(id)},(err,result)=>{
    if(err){console.log("Data was correpted")}
    if(!err){
        db.collection('users').find().toArray()
        .then((value)=>{
           res.render('index',{
            title:"Home page",
            alert:false,
            user:value
           })
        })
    }
   })
 
})


router.get('/add',(req,res)=>{
    res.render('add_user',{title:"add_user"})
})
//Update router
router.get('/updateData',(req,res)=>{
    const {id}=req.query;
    db.collection('users').findOne({"_id":new mongodb.ObjectId(id)},(err,obj)=>{
    if(err){console.log(err);}
    if(!err){
       console.log(obj)
         res.render('update_user',{title:"Update user",user:obj});
    }
    });
   
});

//Update data route

router.post('/update',(req,res)=>{
const{name,email,phone,password}=req.body;
const {id}=req.query
db.collection('users').updateOne({
    "_id":new mongodb.ObjectId(id)},
    {$set:{"name":name,"email":email,"phone":phone,"password":password}},
    (err,obj)=>{
        if(err){console.log(err);}
        if(!err){console.log("Data was update")
        db.collection('users').find().toArray()
        .then((value)=>{
           res.render('index',{
            title:"Home page",
            alert:true,
            user:value
           })
    })
    }

    }
)

})

 router.get('/about',(req,res)=>{
    res.render('about',{title:"about"});
 });
 router.get('/contact',(req,res)=>{
    res.render('contact',{title:"Contact"});
 })
module.exports=router;

