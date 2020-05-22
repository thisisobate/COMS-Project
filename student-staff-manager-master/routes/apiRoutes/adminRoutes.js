const router = require("express").Router();
const {canEdit} = require('../../middlewares/auth')
const {
  createAdmin,
  signinAdmin,
  getAdmins,
  getAdminsCount,
  getAdmin,
  deleteAdmin,
  editAdmin,
} = require("../../controllers/adminController");

module.exports = function () {
  router.post("/", canEdit, createAdmin);
  router.post("/signin", signinAdmin);
  router.get("/", getAdmins);
  router.get("/count", getAdminsCount);
  router.get("/:adminId", getAdmin);
  router.put("/:adminId", canEdit, editAdmin);
  router.delete("/:adminId", canEdit, deleteAdmin);

  return router;
};
