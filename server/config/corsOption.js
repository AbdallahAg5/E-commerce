const allowedOrigins=require('./allowedOrigins')

// this file is were the 
// this is a 3rd party middleware meaning that u need to respect the config documentation
const corsOption ={
    origin:(origin,callback)=>{
        // only the specified origin will access this api + software with no origin exaple (postman)
         if (allowedOrigins.indexOf(origin) !== -1 || !origin ) {
            callback(null,true)
         }
         else{
            callback(new Error('Not allowed By Cors . ') )
         }
    },
    credentials:true,
    optionsSuccessStatus:200
} 

module.exports = corsOption





