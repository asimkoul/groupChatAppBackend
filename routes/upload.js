const express = require("express");
const multer = require("multer");
const upload = multer();

const userauthentication = require("../middleware/auth");
const uploadController = require("../controllers/upload");

const router = express.Router();

router.post('/upload-image', userauthentication.authenticate,upload.single('image'), uploadController.uploadImage);
module.exports = router;