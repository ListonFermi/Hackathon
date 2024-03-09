const express = require("express");
const app = express();
const path = require("path");
const morgan= require('morgan')

const port = process.env.PORT || 3000;
const userRoutes = require("./router/userRoutes.js");
const adminRoutes = require("./router/adminRoutes.js");

app.use(morgan('dev'))


app.use(userRoutes);


