const express = require('express')
const user = express.Router()

const username = "admin";
const password = "admin@";

user.get('/',(req,res)=>{
    if(req.session.user){
        res.render('home')
    }else{
        if(req.session.passwordwrong){
            res.render('login',{msg:"Invalid Credentials"})
            req.session.passwordwrong=false;
        }else{
            res.render('login');
        }     
    }   
})

user.post('/verify',(req,res)=>{
    console.log(req.body);

    if(req.body.username === username && req.body.password===password){
        
        req.session.user = req.body.username  //username stored in session
        res.redirect('/home')
    }else{
        req.session.passwordwrong=true;
        res.redirect('/');
    }
})

user.get('/home',(req,res)=>{
    if(req.session.user){
        res.render('home')
    }else{
        if(req.session.passwordwrong){
            res.render('login',{msg:"Invalid Credentials"})
            res.session.passwordwrong=false;
        }else{
            res.render('login');
        }        
    }
})

user.get('/logout',(req,res)=>{
    req.session.destroy()
    res.render('login',{msg:"Logged out"});
})


module.exports=user