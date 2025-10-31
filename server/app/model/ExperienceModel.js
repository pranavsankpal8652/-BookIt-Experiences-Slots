const mongoose = require("mongoose");

const TimeSlotSchema = new mongoose.Schema({
  time: { type: String, required: true },
  available: { type: Number, required: true },
});

const SlotSchema = new mongoose.Schema({
  date: { type: String, required: true },
  times: { type: [TimeSlotSchema], required: true },
});

const ExperienceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  slots: {
    type: [SlotSchema],
    required: true,
  },
});

const ExperienceModel = mongoose.model("Experience", ExperienceSchema);
module.exports = ExperienceModel;
