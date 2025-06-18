const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    console.log("file field", file);
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // const ext = path.extname(file.originalname);
    const safeName = file.originalname
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9.-]/g, "");
    cb(null, safeName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/jpg",
    "image/gif",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, PNG, and WEBP images are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

module.exports = upload;
