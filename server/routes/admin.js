const express=require('express');
const DashBoard_Controller = require('../controller/dashBoardController');
const Router=express.Router()
const Home_Controller=require('../controller/homeController')
const dashboard_Controller=require('../controller/homeController')
const Admin = require("../model/admin_model");


Router
.route('/')
.get(Home_Controller.get)
.post( Home_Controller.post)
.patch()
.delete()



Router
.route('/dashboard')
.get(DashBoard_Controller.get)




module.exports = Router