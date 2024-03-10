const express = require("express");
const adminController = require("../controller/adminController");
const isLoginAdmin = require("../middlewares/adminMiddleware");
const router = express.Router();

router.get("/", adminController.adminLogin);
router.post("/login", adminController.adminLoginPost);
router.get("/dashboard", isLoginAdmin, adminController.adminDashboard);

router.get("/companiesDashboard", isLoginAdmin, adminController.companiesDashboard);
router.post("/companiesDashboard/add", isLoginAdmin, adminController.addCompanyData);


module.exports = router;