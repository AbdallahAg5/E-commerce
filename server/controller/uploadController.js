const uploadCotroller = require('express').Router()
const multer = require ('multer')
const VerifyToken=require('../middleware/auth')

const storage = multer.diskStorage({
      destination:(req,file,cb)=>{
           cb(null,"public/images")
      },
      filename:(req,file,cb)=>{
          cb(null,req.body.filename)
      }
})

const upload = multer({
      storage:storage
})


