const express = require("express");

const userController = require("../controller/userController");
const authController = require("../controller/authController");
const { protectedRoute } = require("../middlewares/protectedRoute");
const { uploadToServer } = require("../middlewares/multer");

const router = express.Router();

router.post("/signup", authController.signupUser);
router.post("/login", authController.loginUser);

router.patch("/upload-image",protectedRoute,uploadToServer,userController.uploadImage);
router.patch("/upload-profile",protectedRoute,userController.updateProfile);

module.exports = router;
