const express = require("express");
const db =  require('./dbConnection/db');  
const app =  express();
const userRoute = require("./routes/userRoutes");
const pinRoute =  require('./routes/pinsRoutes');
const bcrypt = require("bcrypt");
// const userRoutes = require("./routes/userRoutes")

app.use(express.json());

app.post("/create", async  (req,res)=> {
try{
     const name =  req.body.name;
     const password =  req.body.password;
     const newUser  =  await user.create({ name : name, password : password })
     res.status(200).json(newUser);

}
catch (err)  { 
  console.log(err);
}

// app.use("/user",userRoutes)

});

app.get("/find", async (req,res)=> {
     try{
    const response = await user.find();
    res.status(200).json(response);
    }
    catch(err) {
        console.log("error in finding user",err)
    }
});

app.use("/api/pins", pinRoute);
app.use("/api", userRoute);

app.listen(3000,()=> {
    console.log("Backend Server is running on 3000");
})
