const mongoose = require("mongoose");

const HotelSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
    },
    Localisation: {
      type: String,
    },
    Description: {
      type: String,
    },
    Stars: {
      type: String,
    },
    Images: {
      type: String,
    },
    Latitude: {
      type: Number,
    },
    Longitude: {
      type: Number,
    },

    Reviews: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Hotel", HotelSchema);
