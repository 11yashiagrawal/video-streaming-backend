import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      return null;
    }
    //upload on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    //file uploaded successfully
    fs.unlinkSync(localFilePath);
    // console.log("Response from cloudinary: ", response);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

const deleteFromCloudinary = async (url) => {
  try {
    if (!url) {
      return null;
    }

    //extract public id from url
    const urlParts = url.split("/");
    const fileName = urlParts[urlParts.length - 1];
    const publicId = fileName.split(".")[0];

    // console.log("Public ID to be deleted: ", publicId);

    //delete from cloudinary
    const response = await cloudinary.uploader.destroy(publicId);

    //file deleted successfully
    // console.log("Delete Response from cloudinary: ", response);
    return response;
  } catch (error) {
    // console.log("Error while deleting from cloudinary: ", error);
    return null;
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
