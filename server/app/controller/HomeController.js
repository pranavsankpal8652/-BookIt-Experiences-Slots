const ExperienceModel = require("../model/ExperienceModel");

const getExperiences = (req, res) => {
  ExperienceModel.find()
    .then((experiences) => {
      res.status(200).json(experiences);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to fetch experiences" });
    });
};
module.exports = { getExperiences };
