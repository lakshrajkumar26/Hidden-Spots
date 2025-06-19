// const { application } = require("express");
const mongoose = require("mongoose");

 const pinSchema = new mongoose.Schema({
    username : {
        type :String,
        required : true,
    },
    title :{
        type : String,
        require : true,
        max: 50 ,
       
    },
    desc : { 
        type : String,
        required : true,
         min: 6 ,
    }, 
    rating : {
        type : Number,
        require : true,
        min : 0,
        max:5,
    },
    lat: {
        type : Number,
        required : true,
        }, 
    long: {
        type : Number,
        required : true,
    }
 },{
    timestamps:true}
);

  const user = mongoose.model("pins", pinSchema);
  module.exports= user;