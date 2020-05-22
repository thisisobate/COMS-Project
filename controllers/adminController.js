const {
  createAdmin,
  signinAdmin,
  getAdmins,
  getAdminsCount,
  getAdmin,
  deleteAdmin,
  editAdmin,
} = require("../services/adminServices");

const { response } = require("../helpers/messages");
const CustomError = require('../helpers/CustomError')

class AdminContoller {
  async createAdmin(req, res, next) {
    const token = await createAdmin(req.body);
    res.status(201).send(response("Account created", token));
  }

  async signinAdmin(req, res, next) {
    const token = await signinAdmin(req.body);
    res.status(200).send(response("Admin signed in", token));
  }

  async getAdmins(req, res, next) {
    const admins = await getAdmins();
    res.status(200).send(response("All Admins", admins));
  }

  async getAdminsCount(req, res, next) {
    const count = await getAdminsCount();
    res.status(200).send(response("All Admins count", count));
  }

  async getAdmin(req, res, next) {
    const admin = await getAdmin(req.params.adminId);
    res.status(200).send(response("Admin detail", admin));
  }

  async editAdmin(req, res, next) {
    const admin = await editAdmin(req.params.adminId, req.body);
    // if (req.params.adminId != req.headers.admin.id) throw new CustomError("Invalid Admin", 401)
    res.status(200).send(response("Profile edited", admin));
  }

  async deleteAdmin(req, res, next) {
    const admin = await deleteAdmin(req.params.adminId);
    res.status(200).send(response("Admin deleted", admin));
  }
}

module.exports = new AdminContoller();
