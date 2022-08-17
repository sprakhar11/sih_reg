const express=require("express");
const { verifyToken,verifyTokenAndAuthorise } = require("./verifyToken");
const router=express.Router();
const User=require("../models/User.js");
const bcrypt=require("bcrypt");
// use verifyTokenAndAuthorise when user id is needed for the operation ex crud
// use verifyToken for only simple acess with jwt token
router.get("/",verifyToken,(req,res)=>{
    res.send("this is user page");
});

// get user profile data (except password)
router.get("/myprofile",verifyToken,async (req,res)=>{
    // show user data
    try{
        id=await req.user._id; // getting id form the jwt encryption
        
       const user=await User.findById(id);
       if(!user){
           res.status(200).json({ success: false, message: "user not found" });
       }else{
           
          
           const {password,...others}=user._doc;
           res.status(200).json({...others});
       }
        }catch (e){
            
            res.status(500).json({ success: false, message: "server data not found" });
        }
});
// update user profile (test)
router.patch("/myprofile",verifyToken, async(req,res)=>{
        // update user profile here
        // const salt=await bcrypt.genSalt(10);
        // const hashedPass=await bcrypt.hash(req.body.password,salt);
        id= req.user._id;
       
       
        User.findByIdAndUpdate(id,{
            name:req.body.name,
            
            // password:hashedPass,
            admissionNumber:req.body.admissionNumber,
            additionalDetails:req.body.additionalDetails
            
        }).then((user)=>{
            // console.log(user.additionalDetails['hello']);
            res.status(200).json({ success: true, message: "user profile updated Success" });
        }).catch((error)=>{
            console.log(error);
            res.status(500).json({ success: false, message: "user profile not updated" });

        });
   
    
    });
    

    // additional Details test
// router.patch ("/myprofile/additionalDetails",verifyToken,(req,res)=>{
//     id= req.user._id;
    
    
//         User.findByIdAndUpdate(id,{
//             // additionalDetails:req.body
//             ...others=details
//         }).then((user)=>{
//             var phoneNumber=user.additionalDetails[0]['codeChefProfile']
//             console.log(phoneNumber);
//             res.status(200).json("additional Details added Success");
//         }).catch((error)=>{
//             console.log(error);
//             res.status(500).json("additional Details not added Success");

//         });
// });

router.get("/test/:id",verifyTokenAndAuthorise,(req,res)=>{
    res.send("hello");
});
router.get("/userTest",(req,res)=>{
    res.send("this is user test");
})
router.post("/userTest",(req,res)=>{
   const name=req.body.name;
   res.send("the name is"+name);
})
module.exports=router;