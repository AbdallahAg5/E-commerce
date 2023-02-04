const express=require('express');
const productController = require('../controller/productController');
const authController=require('../controller/adminAuthController')
const VerifyToken=require('../middleware/auth')

const Router=express.Router()



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
    return res.redirect('/admin/');
})



Router
.route('/dashboard')
.get(VerifyToken,productController.getProduct)
.post(VerifyToken,productController.createProduct)


Router
.route('/product/:name')
.get(VerifyToken,productController.getSingleProduct)

Router
.route('/delete/:id')
.delete(VerifyToken,productController.deleteProduct)

Router
.route('/add')
.get(VerifyToken,productController.createProductPage)





module.exports = Router