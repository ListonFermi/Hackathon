module.exports = {
  adminLogin: async (req, res) => {
    res.render("adminPages/loginPage");
  },
  adminLoginPost: async (req, res) => {
    const {email, password} = req.body
    const {ADMIN_EMAIL, ADMIN_PASS} = process.env

    const check= (email === ADMIN_EMAIL && password===ADMIN_PASS)
    console.log(check);
    if(check){
      req.session.admin.login = true
      res.status(200).send({success: true})
    }else{
      res.status(208).send({success: false})
    }
  },
  adminDashboard: async (req, res) => {
    res.render("adminPages/dashboard");
  },
};
