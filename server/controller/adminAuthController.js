const AdminModel = require("../model/admin_model");
const jwt=require('jsonwebtoken')


module.exports = {
  get: (req, res) => {
     res.render('login')
  },

  post: async (req, res) => {
    const {email,password}=req.body
    try {
      // get the user from db without getting the password
      const admin = await AdminModel.find({ email: email, password: password }).select('-password')
      if (admin.length > 0) { 
          // right here i create the token by executing the function
          const token=jwt.sign({...admin[0]},process.env.JWS_SECRET,{expiresIn:'5h'})
          res.cookie('token',token,{httpOnly:true})
        return res.status(200).redirect("/admin/dashboard");
      } else {
        res.status(200).render("login", { message: "PassWord/Email Wrong" });
      }
    } catch (error) {   
      res.status(400).json({ err: error.message });
    }
  },
};
