const Admin = require("../models/admin").admin;
const CustomError = require("../helpers/CustomError");

async function canEdit(req, res, next) {
  const admin = await Admin.findOne({ _id: req.headers.token });

  if (!admin) throw new CustomError("Admin dosen't exist");

  if (admin.canEdit == "true") {
    next();
  } else {
    throw new CustomError("Unauthorized user", 401);
  }
}

module.exports.canEdit = canEdit;
