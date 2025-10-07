import { v2 as cloudinary } from "cloudinary"; 

import fs from "fs";// file system. for file handling.

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async(localFilePath)=>{
    try {
        if(!localFilePath) return null
        // upload file on Cloudinary 
     const response =  await  cloudinary.uploader.upload(localFilePath,{// for uploading to cloudinary
            resource_type:"auto"
        })
        // file has been uploaded successfull
        // console.log("File is uploaded on cloudinary ",response);// for testing purpose
        
        fs.unlinkSync(localFilePath) // unlink the file from the temp folder .

        return response //
        
    } catch (error) {
        fs.unlinkSync(localFilePath)// remove the Locally saved temporary file as the upload operation got failed.
        return null;
    }
}




// cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commans/a/ae/Olympic_falg.jpg",
//     {public_id : "olymipic_flag"},
//     function(error,result){console.log(result);
//     }
// )

export {uploadOnCloudinary}