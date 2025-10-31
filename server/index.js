const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const port = process.env.PORT;
const mongoURI = process.env.MONGO_URI;
const app = express();
app.use(express.json());
app.use(cors());

const HomeRoutes = require("./app/routes/HomeRoutes");
const ExperienceDetailRoutes = require("./app/routes/ExperienceDetailRoutes");
const CheckOutRoutes = require("./app/routes/CheckOutRoutes");
const BookingRouter = require("./app/routes/BookingRoutes");

app.use("/home", HomeRoutes);
app.use("/detail", ExperienceDetailRoutes);
app.use("/checkout", CheckOutRoutes);
app.use("/bookings", BookingRouter);

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
