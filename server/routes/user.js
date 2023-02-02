const express=require('express');
const Router=express.Router()
const registerController=require('../controller/registerController')
const loginController=require('../controller/loginController')


Router
.route('/register')
.post( registerController.post)


//Router
//.route('/login')
//.get(loginController.get)
//.post( loginController.post)





module.exports = Router