const mongoose=require("mongoose");
const { boolean } = require("webidl-conversions");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
    },

    deliveryaddress:{
        type:String,
        require:true,
    },

    type:{
        type:Object,
        required:false
    }
    
     
},{collection:"user",timestamps:true});

module.exports=mongoose.model("User",userSchema);