const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StaffSchema = new Schema(
  {
    img: {
      type: String,
    },
    name: {
      type: String,
    },
    phone: {
      type: Number,
    },
    email: {
      type: String
    },
    address: {
      type: String
    },
    unit: {
      type: String,
    },
    employmentStatus: {
      type: String,
      default: "employed",
    },
    level: {
      type: Number,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Staff", StaffSchema);
