const UserModel=require('../model/user_model')
const bcrypt=require('bcrypt')
require("dotenv").config();
const jwt=require('jsonwebtoken')


    // register controller
   const Register=async(req,res)=>{
           // getting the values from the req.body obj + renaming the password (a cause of an err )
          const {name,email,password:UserPass,password_confirmation }=req.body
          
          // data validation
          if (!name || !email || !UserPass || !password_confirmation  ) {
            return  res.status(400).json({message:'All Fields Required'})
          }
          
          // chek if passwords match 
          if (password_confirmation != UserPass) {
            return  res.status(401).json({message:"Passwords Don't Match"}) // 401 Unauthorized
          }

          //check duplicate
          const duplicate=await UserModel.find({email:email})
          if (duplicate.length > 0) {
              // 409 conflict err
            return  res.status(409).json({message:"Email Aready Exists"})
          }

          //hash password
          const hashPassword=await bcrypt.hash(UserPass,10) // the 10 means the complexity of hashing 
          const userObject={name,"password":hashPassword,email}
           console.log(userObject)
          //Create and store user 
          const user=await UserModel.create(userObject)
          await user.save()
          
          // testing if the user is created successfully
          if (user) {
           // right here i create the token 
          const token=jwt.sign({name:name},process.env.JWS_SECRET,{expiresIn:'5h'})
          res.cookie('token',token,{httpOnly:true})
          return res.status(200).json({name:name,token:token})
          }
          else{
            return  res.status(400).json({message:'User not created'})
          } 

    }



  // login
  const Login = async (req, res) => {
    const { email, password} = req.body;

    // data validation
    if (!email || !password) {
      return res.status(400).json({ message: "All Fields Required" });
    }

    //check existens of the email
    const getUser = await UserModel.find({email:email})
    console.log(getUser[0])
    if (getUser.length > 0) {
      console.log(getUser)
     // compare password with hashed one 
    bcrypt.compare(password,getUser[0].password,(err,response)=>{
       if (response) {
          
           // right here i create the token 
          const token=jwt.sign({...getUser[0]},process.env.JWS_SECRET,{expiresIn:'5h'})
          res.cookie('token',token,{httpOnly:true})
          console.log(getUser[0].fullName)
          return res.status(200).json({name:getUser[0].fullName,token:token})
       } else {
        return  res.status(401).json({message:'Email/Password Wrong'}) // 401 Unauthorized
       }
     })

    }
    else{
          return  res.status(404).json({message:'Email/Password Wrong'}) // not found
    }

  
} 


module.exports= {Register,Login}    
