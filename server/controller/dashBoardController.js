const ProductModel=require('../model/product_model')


module.exports  = {
    // get all products
    get: async (req, res) => {
        const products=await ProductModel.find().lean()
        if (products.length <= 0) {
            return res.status(400).json({message:'No products Found . '})
        }
        res.json(products)
       // res.status(200).render('dashboard')
     },
     
     // create new product
     post: async(req,res)=>{
        const {name,description,img}=req.body
        //confirm data
        if(!name || !description || !img){
            return res.status(400).json({message:'All field required'})
        }

        // check duplicate 
        const duplicate=await User.findOne({name:name}).lean()
        if(duplicate){
            return res.status(409).json({message:'Duplicated product name'})
        }
        
     }

}