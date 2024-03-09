const userPage = async (req, res) => {
  res.render("home");
};

const userLogin = (req,res)=>{
  res.render("loginAndSignup")
}

module.exports = { userPage,userLogin };
