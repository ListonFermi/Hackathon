const express = require("express");
const { adminLogin, adminDashboard } = require("../controller/adminController");
const router = express.Router();

router.get("/login",adminLogin);
router.get("/dashboard",adminDashboard);

module.exports = router;