const express = require('express');
const app = express();
const hbs= require('hbs');
const session = require('express-session');
const nocache = require("nocache");
const userRoute= require("./Routes/user")

app.use(express.static('public'));
app.set('view engine','hbs');

app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.use(session({
    secret:'keyboard cat',    //session ID
    resave: false,
    saveUninitialized: true,
}))

app.use(nocache());

app.use('/',userRoute)

app.listen(3003,()=>console.log("Server Running on port 3003"));