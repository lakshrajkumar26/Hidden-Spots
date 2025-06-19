
const mongoose = require("mongoose");

 const userSchema = new mongoose.Schema({
    username: {
    type: String,
    required: true,
    minlength: 3,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    maxlength: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  }
 },{
    timestamps:true}
)

  const user = mongoose.model("user", userSchema);
  module.exports= user;