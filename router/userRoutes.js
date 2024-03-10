const express = require("express");
const router = express.Router();
const userController = require("../controller/userController.js");

router.get("/", userController.homePage);
router.get('/signuplogin',userController.signupLoginPage)
router.post('/signup',userController.signupPost)

module.exports = router;