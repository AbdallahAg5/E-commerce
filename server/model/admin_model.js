const mongoose = require('mongoose');




// create new Schema
const AdminSchema = new mongoose.Schema({
    email: {
        type: String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    
  },{timestamps:true});

module.exports=mongoose.model('Admin', AdminSchema);