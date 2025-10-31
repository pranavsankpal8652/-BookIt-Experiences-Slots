const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  experienceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Experience",
    required: true,
  },
  date: { type: String, required: true },
  time: { type: String, required: true },
  slotsBooked: { type: Number, required: true },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
});
const BookingsModel = mongoose.model("Booking", BookingSchema);
module.exports = BookingsModel;
