const mongoose = require('mongoose');




// create new Schema
const ProductsSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
    img:{
        type:String,
        require:true
    },
    inStock:{
        type:String,
        require:true,
        default:'In Stock',
        enum: ['In Stock', 'Out Of stock']
    }
   
    
    
  },{timestamps:true});

module.exports=mongoose.model('Products', ProductsSchema);