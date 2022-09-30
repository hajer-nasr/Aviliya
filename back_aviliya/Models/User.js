const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    FirstName: {
      type: String,
    },
    LastName: {
      type: String,
    },
    Email: {
      type: String,
    },
    Password: {
      type: String,
    },
    Role: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);
