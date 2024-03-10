const userCollection = require("../model/userModel");
const bcrypt = require("bcryptjs");

module.exports = {
  homePage: async (req, res) => {
    try {
      const userData = req.session?.currentUser;
      res.render("userPages/home", { userData });
    } catch (error) {
      console.log(error);
    }
  },
  signupLoginPage: (req, res) => {
    try {
      const userData = req.session?.currentUser;
      if (!userData) {
        return res.render("userPages/loginAndSignup");
      } else {
        res.redirect("/");
      }
    } catch (error) {
      onsole.log(error);
    }
  },
  signupPost: async (req, res) => {
    try {
      const {
        username,
        email,
        phonenumber,
        jobRole,
        company,
        password,
        gender,
      } = req.body;

      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = new userCollection({
        username,
        email,
        phonenumber,
        jobRole,
        company,
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
    } catch (error) {
      console.log(error);
    }
  },
  loginPost: async (req, res) => {
    try {
      const { email, password } = req.body;
      const existingUser = await userCollection.findOne({ email });

      if (!existingUser) return res.json({ userDoesntExist: true });

      const comparePassword = bcrypt.compareSync(
        password,
        existingUser.password
      );

      if (comparePassword) {
        req.session.currentUser = existingUser;
        return res.json({ success: true });
      } else {
        return res.json({ invalidPassword: true });
      }
    } catch (error) {
      console.log(error);
    }
  },
  logoutPost: async (req, res) => {
    try {
      req.session.currentUser = null;
      return res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
    }
  },
  companyDetailsPage:(req,res)=>{
    try {
      const userData = req.session?.currentUser;
      res.render("userPages/companyDetails",{userData})
    } catch (error) {
      console.log(error)
    }
  }
};
