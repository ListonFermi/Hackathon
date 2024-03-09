const express = require("express");
const app = express();
const path = require("path");
const morgan= require('morgan')
const userRoutes = require("./router/userRoutes.js");
const adminRoutes = require("./router/adminRoutes.js");


const port = process.env.PORT || 3000;

app.use(morgan('dev'))




