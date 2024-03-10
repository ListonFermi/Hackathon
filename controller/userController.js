const userCollection = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports = {
  homePage: async (req, res) => {
    res.render("userPages/home");
  },
  signupLoginPage: (req, res) => {
    res.render("userPages/loginAndSignup");
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
};
