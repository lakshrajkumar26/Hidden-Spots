const express = require("express");
const router =  express.Router();
const user = require("../model.js/userModel");
const bcrypt = require("bcrypt");




//register
router.post("/register", async (req,res)=> {
    try{
        
        //hashing pass
        const salt = await bcrypt.genSalt(10)
         const  hashedPass = await bcrypt.hash(req.body.password ,salt,)   
         //new user  
         const newUser =   new user({
            username : req.body.username,
            email  : req.body.email,
            password : hashedPass
         })
         const response = await newUser.save();
        res.status(200).json(response.id);
    }
    catch(err) {
        console.log("error in finding user",err)
        res.status(500).json("error :",err)
    }
   
})

//login users

router.post("/login",async (req,res)=> {
    try{
        //find user
      const dbuser = await user.findOne({username:req.body.username}); //n db
      if(!dbuser) return res.status(400).json("wrong username or password")
        // if user found => valid password
        const validpassword = await bcrypt.compare(req.body.password , dbuser.password);
        if(!validpassword) return res.status(400).json("wrong username or password");
        //if all perfect 
        res.status(200).json({id : dbuser.id, username : dbuser.username });

    }
    catch(err){
        console.log(err)
    res.status(500).json({error: err});
    }

})


module.exports = router;