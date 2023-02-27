const ProductModel=require('../model/product_model')



    // get all products for admin
    const getProductForAdmin= async (req, res) => {
        const products=await ProductModel.find().lean()
        if (products.length <= 0) {
            return res.status(400).json({message:'No products Found . '})
        }
        // else return all products
        res.render('dashboard',{products:products})
     }

     
    // get all products for user
    const getProductForUser= async (req, res) => {
        const products=await ProductModel.find().lean()
        if (products.length <= 0) {
            return res.status(400).json({message:'No products Found . '})
        }
        // else return all products
        return res.status(200).json({products:products})
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
        const {name,description,price}=  req.body
       // const modifiedFilename = req.file.filename;  logs the modified filename
       
        
       
        //confirm data
        if(!name || !description || !price || !req.file){
            return res.status(400).json({message:'All field required'})
        }

        // check duplicate 
        const duplicate=await ProductModel.findOne({name:name}).lean()
        if(duplicate){
            return res.status(409).json({message:'Duplicated product name'})
        }else{
            const ImgProduct = req.file.filename;
             const product=await ProductModel.create({...req.body,img:ImgProduct})
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


       //update product view
       const updateProductPage=async(req,res)=>{
            const {params}=req
            try {
                let product= await ProductModel.find({'_id':params.id})
                res.render("update", {
                    id: product[0]._id,
                    name: product[0].name,
                    description: product[0].description,
                    price: product[0].price,
                    img: product[0].img,
                  });

            } catch (err) {
                res.status(500).json(err.message)
            }
       }


       //update product
       const updateProduct=async(req,res)=>{
        console.log(req.body)
        var id = req.params.id;
        console.log(id)
        const ImgProduct = req.file.filename;
       const product = await ProductModel.findByIdAndUpdate(id, {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        img:ImgProduct,
        });

        console.log(product) 
        res.redirect("/admin/dashboard");

        }






module.exports = {getProductForUser,
                 getProductForAdmin,
                 createProduct,
                 getSingleProduct,
                 deleteProduct,
                 createProductPage,
                 updateProductPage,
                 updateProduct}