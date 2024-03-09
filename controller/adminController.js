const adminLogin = (req,res)=>{
    res.render("adminPages/loginPage")
}

const adminDashboard = (req,res)=>{
    res.render("adminPages/dashboard")
}


module.exports = {adminLogin,adminDashboard}