const ExperienceModel = require("../model/ExperienceModel");

const experienceDetails = (req, res) => {
  const id = req.params.id;
  // console.log(id);
  if (id) {
    ExperienceModel.findById(id)
      .then((experience) => {
        if (!experience) {
          return res.status(404).json({ error: "Experience not found" });
        }

        res.status(200).json(experience);
      })
      .catch((error) => {
        res.status(500).json({ error: "Failed to fetch experience details" });
      });
  }
};

module.exports = { experienceDetails };
