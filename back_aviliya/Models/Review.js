const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    Value: {
      type: Number,
    },

    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    Images: {
      type: String,
    },

    Justificatif: {
      type: String,
    },

    Hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Review", ReviewSchema);
