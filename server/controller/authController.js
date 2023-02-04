const UserModel=require('../model/user_model')
const bcrypt=require('bcrypt')
require("dotenv").config();
const jwt=require('jsonwebtoken')

// this  function  takes the user as a parameter and return a jwt for the user created .
const createToken=(user)=>{
    const payload={
         id:user[0]._id.toString(),
         email:user[0].email
    }
    const token=jwt.sign(payload,process.env.JWS_SECRET,{expiresIn:'5h'})

    return token
}

    // register controller
   const Register=async(req,res)=>{
           // getting the values from the req.body obj + renaming the password (a cause of an err )
          const {fullName,email,password:UserPass}=req.body
          
          // data validation
          if (!fullName || !email || !UserPass ) {
            return  res.status(400).json({message:'All Fields Required'})
          }

          //check duplicate
          const duplicate=await UserModel.find({email:email})
          if (duplicate.length > 0) {
               console.log(duplicate)
              // 409 conflict err
            return  res.status(409).json({message:"Email Aready Exists"})
          }

          //hash password
          const hashPassword=await bcrypt.hash(UserPass,10) // the 10 means the complexity of hashing 
          const userObject={fullName,"password":hashPassword,email}

          //Create and store user 
          const user=await UserModel.create(userObject)
          await user.save()
          
          // testing if the user is created successfully
          if (user) {
             return res.status(200).json({message:'User created'})
          }
          else{
            return  res.status(400).json({message:'User not created'})
          } 

    }



  // login
  const Login = async (req, res) => {
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
        console.log(getUser)
           // right here i create the token by executing the function
          const token=createToken(getUser)
          return  res.json({token:token})
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
