const express = require("express");
const adminController = require("../controller/adminController");
const router = express.Router();

router.get("/", adminController.adminLogin);
router.post("/login", adminController.adminLoginPost);
router.get("/dashboard", adminController.adminDashboard);


module.exports = router;