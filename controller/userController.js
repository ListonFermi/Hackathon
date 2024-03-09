const userPage = async (req, res) => {
  res.render("userPages/home");
};

const userLogin = (req,res)=>{
  res.render("userPages/loginAndSignup")
}

module.exports = { userPage,userLogin };
