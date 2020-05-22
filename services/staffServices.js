const Staff = require('../models/staff');
const CustomError = require('../helpers/CustomError');

class StaffService {
  async createStaff(data) {
    if (await Staff.findOne({ email: data.email }))
      throw new CustomError('email already exists');
    const staff = new Staff(data);
    await staff.save();
  }

  async getStaff(_id) {
    const staff = await Staff.findOne({ _id });

    return staff;
  }

  async getStaffs() {
    const staffs = await Staff.find({});

    return staffs;
  }

  async getStaffsCount() {
    const staffs = await Staff.find({}).count();

    return staffs;
  }

  async getStaffsVerifiedCount() {
    const staffs = await Staff.find({ employmentStatus: 'indigene' }).count();

    return staffs;
  }

  async editStaff(_id, data) {
    const staff = await Staff.findOneAndUpdate({ _id }, data);

    return staff;
  }

  async deleteStaff(_id) {
    const staff = await Staff.findOneAndRemove({ _id });

    return staff;
  }
}

module.exports = new StaffService();
