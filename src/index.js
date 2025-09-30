// require('dotenv').config({path:})
import dotenv, { configDotenv } from "dotenv"
import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
import connectDB from "./Db/index.js";


dotenv.config({
    path:'./.env'
})


connectDB();







/*
import express from "express"
const app = express()

(async()=>{
    try{
     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
     app.on("error",()=>{console.log("Eroor due to app on exprexx");
        throw error
     })

     app.listen(process.env.PORT,()=>{
        console.log(`App is listening on ${process.env.PORT}`);
        
     })
    }catch(error){
        console.error("Error: ",error);
        throw error
    }
    
})()

connectDB();
*/
