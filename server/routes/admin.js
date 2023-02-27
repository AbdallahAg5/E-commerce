const express=require('express');
const productController = require('../controller/productController');
const authController=require('../controller/adminAuthController')
const VerifyToken=require('../middleware/adminAuth')
const multer = require("multer");
const path = require('path');


const Router=express.Router()


// upload img code
const imageStorage = multer.diskStorage({
    // Destination to store image     
    destination: (req,file,cb)=>{
                 cb(null,'public/uploads') }, 
    filename:async (req, file, cb) => {
      const modifiedFilename = file.fieldname + '_' + Date.now() + path.extname(file.originalname);
      await cb(null, modifiedFilename);
            // file.fieldname is name of the field (image)
            // path.extname get the uploaded file extension
    }
  });
const upload = multer({ storage: imageStorage }) 


Router
.route('/')
.get(authController.get)
.post(authController.post)
.patch()
.delete()


Router
.route('/logout')
.post((req,res)=>{
    res.clearCookie('token', { path: '/' });
    return res.redirect('/admin');
})



Router
.route('/dashboard')
.get(productController.getProductForAdmin)
.post([VerifyToken, upload.single('img')],productController.createProduct)


Router
.route('/product/:name')
.get(productController.getSingleProduct)

Router
.route('/delete/:id')
.delete(VerifyToken,productController.deleteProduct)

Router
.route('/add')
.get(VerifyToken,productController.createProductPage)

Router
.route('/update/:id')
.get(VerifyToken,productController.updateProductPage)
.post([VerifyToken, upload.single('img')],productController.updateProduct)





module.exports = Router