const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "field name is required"],
    },
    regNo: {
      type: String,
      required: [true, "reg no is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    faculty: {
      type: String,
      required: [true, "faculty is required"],
    },
    department: {
      type: String,
      required: [true, "department is required"],
    },
    yearOfEntry: {
      type: String,
      required: [true, "year Of Entry is required"],
    },
    yearOfGrad: {
      type: String,
      required: [true, "year Of fGrad is required"],
    },
    feesStatus: {
      type: String,
      default: "not paid",
    },
    gradStatus: {
      type: String,
      default: "pending",
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", StudentSchema);
