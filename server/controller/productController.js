const ProductModel=require('../model/product_model')




    // get all products
    const getProduct= async (req, res) => {
        const products=await ProductModel.find().lean()
        if (products.length <= 0) {
            return res.status(400).json({message:'No products Found . '})
        }
        // else return all products
        res.render('dashboard',{products:products})
     }



     // get a single product
     const getSingleProduct=async (req,res)=>{
           const {params}=req
           try {
              let product=await ProductModel.find({name:params.name})
              if (product.length > 0) {
                  return res.status(200).render('product',{product:product[0]})
              } else {
                  return res.status(400).json({message:"No Product with this name"})
              }
           } catch (err) {
                res.status(500).json(err.message)
           }

     }
      
    const createProductPage=(req,res)=>{
          return res.render('add')
    } 

     
     // create new product
    const  createProduct = async(req,res)=>{
        const  {name,description,price,img}=  req.body
        //confirm data
        if(!name || !description || !img || !price){
            console.log(req.body)
            return res.status(400).json({message:'All field required'})
        }

        // check duplicate 
        const duplicate=await ProductModel.findOne({name:name}).lean()
        if(duplicate){
            return res.status(409).json({message:'Duplicated product name'})
        }else{
             const product=await ProductModel.create({...req.body})
             await product.save()

         if (product) {
            res.status(200).redirect('/admin/dashboard')
         } else {
            res.status(400).json({message:'Product not created'})
         }
      
            }
        
     }




     // delete a  product
     const deleteProduct=async (req,res)=>{
        const {params}=req
        try {
           let product=await ProductModel.deleteOne({_id:params.id})
             res.redirect('/admin/dashboard')
        } catch (err) {
             res.status(500).json(err.message)
        }

  }


  //update a product
  




module.exports = {getProduct,createProduct,getSingleProduct,deleteProduct,createProductPage}