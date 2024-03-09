const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const nocache = require("nocache");
const dotenv = require("dotenv");
const userRoutes = require("./router/userRoutes.js");
const adminRoutes = require("./router/adminRoutes.js");
const connectDB = require("./config/db.js")

// configure env
dotenv.config()

//Database connection
connectDB()

const port = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(nocache());

app.use(userRoutes);

app.listen(port, () => {
  console.log(`server running in port ${port}`);
});
