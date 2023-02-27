const jwt= require('jsonwebtoken')
require("dotenv").config();


// this is a middleware that cheks the header if it has the authorisation propriete 
const VerifyToken=(req,res,next)=>{
      const {headers}=req
      if (!headers.authorisation) {
           return res.status(403).json({message:'Not authorized'})
      } else if (headers.authorisation.startWith('Beare ')) {
         // jwt composed by the  Bearer str + token  
         // getting the second part of the str that is the token
         const token=headers?.authorisation.split(' ')[1]
         // comparing the jwt token with the secret 
         jwt.verify(token,process.env.JWS_SECRET,(err,data)=>{
               if(err){
                    return res.status(403).json('Wrong or token expired')
               }
               else{
                  req.user = data // obj with the user data 
                  next()

               }
         })
      } 
}

module.exports= VerifyToken