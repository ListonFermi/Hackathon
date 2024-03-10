const isLogin = (req, res, next) => {
  try {
    if (req.session.currentUser) {
      next();
    } else {
      res.redirect("/signuplogin");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = isLogin;
