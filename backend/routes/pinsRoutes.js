const express = require("express");
const router =  express.Router();

const Pin = require("../model.js/pin");

//all pins
router.get("/", async (req,res)=> {
    try{
         const data = req.body
    const response = await Pin.find();
    res.status(200).json(response);
    }
    catch(err) {
        console.log("error in finding user",err)
        res.status(500).json("error :",err)
    }
   
})



//create pins
router.post("/", async (req,res)=> {
    try{
         const data = req.body;
         const newPin  = new Pin(data); 
         const response =  await newPin.save();
        res.status(200).json(response);
    }
    catch(err) {
        console.log("error in finding user",err)
        res.status(500).json("error :",err)
    }
   
})


module.exports = router;