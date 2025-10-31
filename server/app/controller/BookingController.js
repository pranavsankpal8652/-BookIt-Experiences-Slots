const { response } = require("express");
const BookingsModel = require("../model/BookingsModel");
const ExperienceModel = require("../model/ExperienceModel");

async function decrementAvailability(id, date, time, quantity) {
  const filter = {
    _id: id,
    "slots.date": date,
    "slots.times.time": time,
    "slots.times.available": { $gte: quantity }, // ensure enough slots
  };

  const update = {
    $inc: {
      "slots.$[s].times.$[t].available": -quantity, // subtract booked count
    },
  };

  const options = {
    arrayFilters: [{ "s.date": date }, { "t.time": time }],
  };

  try {
    const result = await ExperienceModel.updateOne(filter, update, options);
    if (result.modifiedCount > 0) {
      console.log(`Availability updated: -${quantity}`);
    } else {
      console.log(" No match found or not enough availability");
    }
  } catch (err) {
    console.error(" Error updating availability:", err);
  }
}

const AddBookings = (req, res) => {
  const Booked = req.body;
  //   console.log(Booked);
  const { date, time, quantity } = Booked.data;

  BookingsModel.insertOne({
    experienceId: Booked.id,
    date: date,
    time: time,
    slotsBooked: quantity,
    userName: Booked.userName,
    userEmail: Booked.email,
  })
    .then((response) => {
      //   console.log(response);
      if (response._id) {
        decrementAvailability(Booked.id, date, time, quantity);

        res
          .status(200)
          .json({ ref_id: response._id, msg: "Booking Confirmed" });
      } else res.status(500).json({ msg: "Booking Failed" });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = AddBookings;
