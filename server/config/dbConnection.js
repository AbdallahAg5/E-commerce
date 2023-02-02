const mongoose=require('mongoose')

const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.DB_CONNECTION)
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDb