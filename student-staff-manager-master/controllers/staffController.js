const {
  createStaff,
  getStaff,
  getStaffs,
  getStaffsCount,
  getStaffsVerifiedCount,
  editStaff,
  deleteStaff,
} = require('../services/staffServices');
const { response } = require('../helpers/messages');

class StaffContoller {
  async createStaff(req, res, next) {
    console.log(req.body)
    const staff = await createStaff(req.body);
    res.status(201).send(response('Account created.', staff));
  }

  async getStaff(req, res, next) {
    let data = await getStaff(req.params.staffId);
    res.status(200).send(response('Found', data));
  }

  async getStaffs(req, res, next) {
    let data = await getStaffs();
    res.status(200).send(response('All Staffs', data));
  }

  async getStaffsCount(req, res, next) {
    let count = await getStaffsCount();
    res.status(200).send(response('All Staffs count', count));
  }

  async getStaffsVerifiedCount(req, res, next) {
    let count = await getStaffsVerifiedCount();
    res.status(200).send(response('All verified Staffs count', count));
  }

  async editStaff(req, res, next) {
    let data = await editStaff(req.params.staffId, req.body);
    res.status(200).send(response('Staff edited', data));
  }

  async deleteStaff(req, res, next) {
    let data = await deleteStaff(req.params.staffId);
    res.status(200).send(response('Staff deleted', data));
  }
}

module.exports = new StaffContoller();
