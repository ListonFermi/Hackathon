const companyCollection = require("../model/companyModel");

module.exports = {
  adminLogin: async (req, res) => {
    try {
      if(req.session?.admin){
        res.redirect('/admin/dashboard')
      }else{
        res.render("adminPages/loginPage");
      }
    } catch (error) {
      console.log(error);
    }
  },
  adminLoginPost: async (req, res) => {
    try {
      const { email, password } = req.body;
      const { ADMIN_EMAIL, ADMIN_PASS } = process.env;

      const check = email === ADMIN_EMAIL && password === ADMIN_PASS;

      if (check) {
        req.session.admin = true;
        res.status(200).send({ success: true });
      } else {
        res.status(208).send({ success: false });
      }
    } catch (error) {
      console.log(error);
    }
  },
  adminDashboard: async (req, res) => {
    try {
      res.render("adminPages/dashboard");
    } catch (error) {
      console.log(error);
    }
  },
  companiesDashboard: async (req, res) => {
    try {
      const companiesData= await companyCollection.find()
      res.render("adminPages/companiesDashboard",{companiesData});
    } catch (error) {
      console.log(error);
    }
  },
  addCompanyData: async (req, res) => {
    try {
      const { companyName, femaleCount, maleCount } = req.body;
      await companyCollection.insertMany([{
        companyName,
        maleCount,
        femaleCount,
      }]);
      res.status(200).json({success: true})
    } catch (error) {
      console.log(error);
    }
  },
};
