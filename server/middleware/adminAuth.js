const jwt= require('jsonwebtoken')
require("dotenv").config();


const VerifyToken=(req,res,next)=>{
      const token = req.cookies.token
      try {
        const admin=jwt.verify(token,process.env.JWS_SECRET)  
        req.admin = admin  
        next()
        
      } catch (err) {
            console.log('no token')
            res.clearCookie=('token')  
            return res.redirect('/admin') 
      }

}



module.exports= VerifyToken