const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const nocache = require("nocache");
const dotenv = require("dotenv");
const userRoutes = require("./router/userRoutes.js");
const adminRoutes = require("./router/adminRoutes.js");
const connectDB = require("./config/db.js");
const session = require("express-session");

// configure env
dotenv.config();

//Database connection
connectDB();

// Creating a session
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "my secret",
  })
);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));

app.use(morgan("dev"));
app.use(nocache());

//parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRoutes);
app.use("/admin", adminRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server running in port ${port}`);
});
