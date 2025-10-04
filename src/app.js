import express from "express";
import Cors from "cors"
import cookieParser from "cookie-parser";
const app = express();
// need to check this option. 
app.use(Cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
// configrations. 
app.use(express.json({limit:"16kb"})) // used to set limit of accepting data.
app.use(express.urlencoded({extended:true,limit:"16kb"}))// this is used to search from url like : parthtinna = parth+tinna // parth%20tinna
app.use(express.static("public"))// serving the static files from the server.
app.use(cookieParser())


// routes import 
import userRouter from './routes/user.routes.js'


// routes declaration
app.use("/api/v1/users",userRouter)

// http://localhost:8000/api/v1/users/register

export {app}