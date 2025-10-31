const express = require("express");
const AddBookings = require("../controller/BookingController");
const BookingRouter = express.Router();

BookingRouter.post("/add", AddBookings);

module.exports = BookingRouter;
