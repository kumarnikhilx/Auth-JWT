import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (imagePath) => {
    try {
        if(!imagePath){
            return null;
        }
        const result = await cloudinary.uploader.upload(imagePath, {        
            folder: 'user_profiles',
        });
        fs.unlinkSync(imagePath); // Delete the local file after upload
        return result.secure_url;
    }

    catch (error) {
        console.log('Error uploading image to Cloudinary:', error);
        throw error;
    }
};
export default uploadOnCloudinary;