const Admin = require("../models/admin").admin;
const CustomError = require("../helpers/CustomError");

class AdminsService {
  async createAdmin(data) {
    if (await Admin.findOne({ email: data.email }))
      throw new CustomError("email already exists");

    const admin = new Admin(data);

    await admin.save();

    return true;
  }

  async signinAdmin(data) {
    if (!data.email) throw new CustomError("No email specified")

    const admin = await Admin.findOne({ email: data.email });

    if (!admin) throw new CustomError("Admin not found", 404);

    if (data.password == admin.password) return admin;
  }

  async getAdmins() {
    return await Admin.find({});
  }

  async getAdminsCount() {
    return await Admin.find({}).count();
  }

  async getAdmin(adminId) {
    const admin = await Admin.findOne({ _id: adminId });

    return admin;
  }

  async editAdmin(adminId, data) {
    const admin = await Admin.findByIdAndUpdate({ _id: adminId }, data, {
      new: true,
    });

    console.log(data)

    if (!admin) throw new CustomError("Admin dosen't exist", 404);

    return admin;
  }

  async deleteAdmin(adminId) {
    return await Admin.findOneAndRemove({ _id: adminId });
  }
}
module.exports = new AdminsService();
