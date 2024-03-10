const companyCollection = require("../model/companyModel");
const reviewCollection = require("../model/reviewsModel");
const userCollection = require("../model/userModel");
const bcrypt = require("bcryptjs");

module.exports = {
  homePage: async (req, res) => {
    try {
      const userData = req.session?.currentUser;
      const companiesData = await companyCollection.find();
      const reviewsData= await reviewCollection.find()
      res.render("userPages/home", { userData, companiesData, reviewsData });
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
  companyDetailsPage: async (req, res) => {
    try {
      const id = req.params.id;
      const userData = req.session?.currentUser;
      const company = await companyCollection.findOne({ _id: id });
      const review = await reviewCollection.find({ companyId: company._id }).populate("userId");
      res.render("userPages/companyDetails", { userData, company, review });
    } catch (error) {
      console.log(error);
    }
  },
  addReview: async (req, res) => {
    try {
      const userId = req.session.currentUser;
      const { companyId, ratings, reviews } = req.body;
      const review = new reviewCollection({
        companyId,
        userId,
        ratings,
        reviews,
      });
      await review.save();
      res.redirect(`/companydetails/${companyId}`);
    } catch (error) {
      console.log(error);
    }
  },
  getChartData:async(req,res)=>{
    try{
      const id = req.params.id
      const currentCompany = await companyCollection.findOne({_id: id})
      const data = await reviewCollection.aggregate([
        {$match:{companyId:currentCompany._id}},
        {$group:{_id:"$ratings",count:{$sum:1}}}
      ])
      res.json({data})
    }catch(error){
      console.log(error)
    }
  }
};
