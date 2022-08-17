const express =require("express");
const jwt=require("jsonwebtoken");


const verifyToken=(req,res,next)=>{
    
   const authHeader= req.headers.authorization && req.headers.authorization.startsWith("Bearer")
    
    if(authHeader){
        
       
       token= req.headers.authorization.split(" ")[1]
        // console.log(token);
        jwt.verify(token,process.env.jwtSec,(error,user)=>{
            if(error){
                res.status(400).json({ success: false, message: "Token is not valid" });
                
            }else{
                req.user=user;
                next();
            }
        });
    }else{
        return res.status(400).json({ success: false, message: "you are not authenticated" });
    }
}


// if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
// ) {
//     token = req.headers.authorization.split(" ")[1];



const verifyTokenAndAuthorise=(req,res,next)=>{// this if the person has user id
    verifyToken(req,res,()=>{
        if(req.user.id===req.params.id){
            next();
        }else{
            res.status(400).json({ success: false, message: "you are not the right person" });
            // redirect here if not the authorized person
        }
    })
}

module.exports={verifyToken,verifyTokenAndAuthorise};
