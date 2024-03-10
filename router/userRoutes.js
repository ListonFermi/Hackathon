const express = require("express");
const router = express.Router();
const userController = require("../controller/userController.js");

router.get("/", userController.homePage);
router.get("/signuplogin", userController.signupLoginPage);
router.post("/signuplogin/signup", userController.signupPost);
router.post("/signuplogin/login", userController.loginPost);
router.post("/signuplogin/logout", userController.logoutPost);

module.exports = router;
