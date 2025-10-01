// require('dotenv').config({path:})
import dotenv, { configDotenv } from "dotenv";
import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
import connectDB from "./Db/index.js";
import { app } from "./app.js";
import { asyncHandler } from "./utils/asyncHandler.js";

dotenv.config({
  path: "./.env",
});


// **********************************Just for Testing **************************
// app.get('/',asyncHandler((req,res)=>{
// res.send("thanku for calling.")
// }))// for testing.

// app.post('/',asyncHandler((req,res)=>{
//     console.log("userCreated");
//     res.send(["name","Parth","message","Thanks for post Request"])
// }))
// ******************************************************************************


try{
connectDB()
  .then(() => {
   const appListen = app.listen(process.env.PORT, () => {
        console.log(`Server is runnint at Port : http://localhost:${process.env.PORT}`);
      })

      appListen.on("error", (error) => {
        console.log("Error while Listening");
        throw error
      });
  })
  .catch((err) => {
    console.log("MongoDB connection Failed !!!", err);
  });
}
catch(error){
    console.log(error);
}


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
