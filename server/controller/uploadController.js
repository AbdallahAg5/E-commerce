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

uploadCotroller.post('/firstImg',VerifyToken,upload.single("firstImg"),async(req,res)=>{
      try {
            return res.status(200).json({msj:'image successfully upload'})
      } catch (error) {
             console.log(error.message)
      }
})


uploadCotroller.post('/secondImg',VerifyToken,upload.single("secondImg"),async(req,res)=>{
      try {
            return res.status(200).json({msj:'image successfully upload'})
      } catch (error) {
             console.log(error.message)
      }
})


module.exports = uploadCotroller
