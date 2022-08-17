const express=require("express");
const path=require("path");
const app=express();
const port=process.env.PORT||8000;
require("dotenv").config();
const mongoose=require("mongoose");
const connectDb=require("./database/database.js");
const DATABASE_URL=process.env.DATABASE_URL;
connectDb(DATABASE_URL);
const cors=require("cors");
app.use(express.json());// to parse the json files
app.use(cors()); // to allow cross origin resource sharing

// routes require
const homeRoute=require("./routes/index");
app.use("/",homeRoute);

app.use("",(req,res)=>{ // for useless links
    res.send("error 404");
});
app.listen(port,(error)=>{
    if(error){
        console.log("error in starting the server");
    }else{
        console.log("server started");
    }
})