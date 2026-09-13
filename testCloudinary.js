require("dotenv").config();

const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

console.log("Cloud name:", process.env.CLOUD_NAME);
console.log("API key loaded:", !!process.env.CLOUD_API_KEY);
console.log("API secret loaded:", !!process.env.CLOUD_API_SECRET);

cloudinary.uploader.upload(
    "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    {
        folder: "Homgobnb"
    }
)
.then(result => {
    console.log("========== SUCCESS ==========");
    console.log("URL:", result.secure_url);
})
.catch(error => {
    console.log("========== CLOUDINARY ERROR ==========");
    console.dir(error, { depth: null });
});