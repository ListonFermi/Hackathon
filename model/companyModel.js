const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  maleCount: { type: Number, required: true } ,
  femaleCount: { type: Number, required: true },
  location: { type: String, enums: [ 'India', 'Worldwide' ] },
  
});

const companyCollection = mongoose.model("company", companySchema, "company");

module.exports = companyCollection;