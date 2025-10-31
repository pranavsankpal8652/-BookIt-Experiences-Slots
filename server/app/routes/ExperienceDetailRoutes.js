const express = require("express");
const {
  experienceDetails,
} = require("../controller/ExperienceDetailController");
const DetailsRouter = express.Router();

DetailsRouter.get("/experiences/:id", experienceDetails);
module.exports = DetailsRouter;
