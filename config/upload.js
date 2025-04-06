const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: 'dxoh9qi26',
    api_key: '119626592821698',
    api_secret: 'ZfC2HuCe8ccdyFhq_sUmkZz4v3I'
});

// Function to upload a file to Cloudinary (including audio)
const uploadFile = async (filePath, resourceType = 'auto') => {
    try {
        // Upload to Cloudinary with the option to upload audio as well
        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: resourceType, // Can be 'auto' to handle image/audio/video automatically
        });
        // console.log(result); // Logs result to the console
        return result; // Return the upload result
    } catch (error) {
        // console.log(error.message); // If there is an error, it will log the message
        throw new Error(error.message);
    }
}

module.exports = {
    uploadFile
}
