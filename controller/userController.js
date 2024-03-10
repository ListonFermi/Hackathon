const userCollection = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports = {
  homePage: async (req, res) => {
    const userData = req.session?.currentUser;
    res.render("userPages/home", { userData });
  },
  signupLoginPage: (req, res) => {
    const userData = req.session?.currentUser;
    if (!userData) {
      return res.render("userPages/loginAndSignup");
    } else {
      res.redirect("/");
    }
  },
  signupPost: async (req, res) => {
    const { username, email, phonenumber, password, gender } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new userCollection({
      username,
      email,
      phonenumber,
      password: hashedPassword,
      gender,
    });

    const existingUser = await userCollection.findOne({
      $or: [{ username }, { email }, { phonenumber }],
    });

    if (existingUser) {
      res.json({ userExists: true });
    } else {
      await newUser.save();
      req.session.currentUser = await userCollection.findOne({ username });
      console.log(req.session.currentUser);
      res.json({ success: true });
    }
  },
  loginPost: async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await userCollection.findOne({ email });

    if (!existingUser) return res.json({ userDoesntExist: true });

    const comparePassword = bcrypt.compareSync(password, existingUser.password);

    if (comparePassword) {
      req.session.currentUser = existingUser;
      return res.json({ success: true });
    } else {
      return res.json({ invalidPassword: true });
    }
  },
  logoutPost: async (req, res) => {
    req.session.currentUser= null
    return res.json({success: true})
  }
};
