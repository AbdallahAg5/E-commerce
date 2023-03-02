const mongoose=require('mongoose')

// new schema + config fields 
const UserSchema=new mongoose.Schema({
    
     name:{
        type:String,
        require:true
      },
      email:{
        type:String,
        require:true,
        unique:true
      },
      password:{
        type:String,
        require:true
      },
      role:{
        type:String,
        default:'User'
      }

},{timestamps:true}) 

module.exports= mongoose.model('User',UserSchema)