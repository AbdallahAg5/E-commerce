const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConnection");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session=require('express-session')
const cors = require("cors");
const corsOption = require("./config/allowedOrigins");
require("dotenv").config();
const AdminRoute = require("./routes/admin");
const UserRoute = require("./routes/user");
const { urlencoded } = require("body-parser");

const UserModel = require("./model/user_model");
const bcrypt = require("bcrypt");

// express init
const app = express();

// db connection
connectDB();
// cors is a mechanism that adds additional info to the header look at config/corsOption.js 
app.use(cors(corsOption));
// middlewares
app.use(urlencoded({ extended: false }));
app.use(express.json());
// cookieparser
app.use(cookieParser());
// body parser
app.use(bodyParser.urlencoded({ extended: true }));
// init session
app.use(session({
  key:"userId",
  secret:'thisisthesecret',
  resave:false,
  saveUninitialized:false,
  cookie:{
       expires: 60 * 60 * 24 * 7 * 4
  }
 
}))

app.set("view engine", "ejs");

// routes
app.use("/admin", AdminRoute);
app.use("/user", UserRoute );

app.post('/user/login',async (req, res) => {
  const { email, password } = req.body;

  // data validation
  if (!email || !password) {
    return res.status(400).json({ message: "All Fields Required" });
  }

  //check existens of the email
  const getUser = await UserModel.find({email:email})
  if (getUser.length > 0) {
   // compare password with hashed one 
  bcrypt.compare(password,getUser[0].password,(err,response)=>{
     if (response) {
      // create session
       req.session.user=getUser[0].fullName
       console.log(req.session)
      return  res.json({name:req.session.user})
     } else {
      return  res.status(401).json({message:'Email/Password Wrong'}) // 401 Unauthorized
     }
   })

  }
  else{
        return  res.status(404).json({message:'Email/Password Wrong'}) // not found
  }}
)

app.get('/user/login',(req,res)=>{
     console.log(req.session)
})
    


// if the route not exixts then 404
app.all("*", (req, res) => {
  res.status(404);
  res.render("FourOFour");
});

mongoose.connection.once("open", () => {
  // listen for request
  app.listen(process.env.PORT, () => {
    console.log("app running");
  });
});
