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
const expressLayouts=require('express-ejs-layouts')



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
app.use(express.static("public/uploads"));
app.use(express.static("public"));


app.use(expressLayouts)
app.set("view engine", "ejs");


// routes
app.use("/admin", AdminRoute);
app.use("/user", UserRoute );



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



