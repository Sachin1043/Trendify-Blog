const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./Cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "fullstack-blog-project",
    allowedFormats: ["jpg", "png"],
  },
});

const upload = multer({ storage });
module.exports = upload;