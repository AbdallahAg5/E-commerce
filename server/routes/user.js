const express=require('express');
const Router=express.Router()
const authController=require('../controller/authController')
const productController=require('../controller/productController')
const VerifyToken=require('../middleware/auth')



Router
.route('/register')
.post(authController.Register)


Router
.route('/login')
.post(authController.Login)



Router
.route('/products')
.get(VerifyToken,productController.getProduct)
.post(VerifyToken,productController.createProduct)


Router
.route('/products/:id')
.get(productController.getSingleProduct)



module.exports = Router