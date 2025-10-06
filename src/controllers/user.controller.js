import { log } from "console";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

// REGISTER USER
//1. first need to get data from the user.
//2. need to validate the data. 
//3. Check if user already exist: username, email
//4. check for images, check for avatar
//5. upload them to cloudinary, avatar
//6. create user object - create entry in db 
//7. remove password and refresh token field from response.
//8. Check for user creation 
//  return response of success.

const registerUser = asyncHandler(async (req,res)=>{

const {fullName,email,username,password}=req.body// form data and json Data.
console.log("email:",email);
console.log("fullname : ",fullName);
// if(fullName==="" || email ==="" ||username===""|| password === ""){
//     throw new ApiError(400,"All fields are required")
// } 

// ABOVE CODE OPTIMIZED WAY

if(
    [fullName,email,username,password].some((field)=>
    field?.trim() ==="")
  )
{
    throw new ApiError(400,"All fields are required");
}


// checking if user already exist using the model
const existedUser = await User.findOne({
    $or:[{ username }, { email }]
})
    if(existedUser){
        throw new ApiError(409,"User already Exists")
    }


// **************************************************************
console.log(req.files); // for debug

// Validating the avatar.
 const avatarLocalPath = req.files?.avatar?.[0]?.path;
const coverImageLocalPath = req.files?.coverImage?.[0]?.path;
  if(!avatarLocalPath){
    throw new ApiError(400,"Avatar file is required.")
  }
//************************ Uploading on the Cloud ********************************
const avatar = await uploadOnCloudinary(avatarLocalPath)
const coverImage = await uploadOnCloudinary(coverImageLocalPath)

if(!avatar){
    throw new ApiError(500,"Something went wrong, File is not uploaded.")
}

// ******************** Create object ********************

const user = await User.create({
    fullName,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
})

// ********************************SELECT TO REMOVE FIELDS *****************************************
const createduser = await User.findById(user._id).select(
    "-password -refreshToken" 
)
console.log(createduser);
if(!createduser){
    throw new ApiError(500,"Somthing went wrong while registering the user")
}

return res.status(201).json(
    new ApiResponse(200,createduser,"User Registered Successfully")
)
})
// *******************************User Registration Done here ********************************************
export {registerUser}

