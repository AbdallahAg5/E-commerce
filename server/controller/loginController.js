const UserModel = require("../model/user_model");
const bcrypt = require("bcrypt");

module.exports = {
  // login
  post: async (req, res) => {
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
    }

  
},


// get : async (req,res)=>{
//    console.log(req.session)
//       if (req.session.user) {
//          console.log(req.session.User)
//          return res.status(200).json({message:'LoggedIn',name:req.session.User})
//       } 
//       else{
//          return res.status(200).json({message:'Not LoggedIn'})
//       }
//   }



};
