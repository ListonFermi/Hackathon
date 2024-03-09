const express = require("express");
const router = express.Router();
const {userPage, userLogin} = require("../controller/userController.js");

router.get("/", userPage);
router.get('/login',userLogin)


module.exports = router;

