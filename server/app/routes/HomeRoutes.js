const express = require("express");
const { getExperiences } = require("../controller/HomeController");
const Homerouter = express.Router();
// Define your home route
Homerouter.get("/experiences", getExperiences);

module.exports = Homerouter;
