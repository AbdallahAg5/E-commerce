const express=require('express');
const Router=express.Router()
const authController=require('../controller/userAuthController')
const productController=require('../controller/productController')
const VerifyToken=require('../middleware/userAuth')



Router
.route('/register')
.post(authController.Register)


Router
.route('/login')
.post(authController.Login)



Router
.route('/products')
.get(productController.getProductForUser)



Router
.route('/products/:id')
.get(productController.getSingleProduct)



module.exports = Router