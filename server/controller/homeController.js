const AdminModel = require("../model/admin_model");

module.exports = {
  get: (req, res) => {
     res.render('login')
  },

  post: async (req, res) => {
    const {email,password}=req.body
    try {
      // get the user from db without getting the password
      const admin = await AdminModel.find({ email: email, password: password }).select('-password')
      console.log(admin)
      if (admin.length > 0) {
        
        res.status(200).redirect("/admin/dashboard");
      } else {
        res.status(200).render("login", { message: "PassWord/Email Wrong" });
      }
    } catch (error) {   
      res.status(400).json({ err: error.message });
    }
  },
};
