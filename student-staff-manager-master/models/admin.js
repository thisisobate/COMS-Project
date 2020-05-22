const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  name: {
    type: String,
    required: [true, "field name is required"]
  },
  email: {
    type: String,
    required: [true, "email is required"]
  },
  password: {
    type: String,
    required: [true, "password is required"]
  },
  canEdit: {
    type: String,
    default: "true"
  }
}, {
  timestamps: true
});

module.exports.admin = mongoose.model("Admin", AdminSchema);
module.exports.admin2 = mongoose.model("Admin2", AdminSchema);
