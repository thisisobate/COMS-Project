const router = require('express').Router();
const {canEdit} = require('../../middlewares/auth2')
const {
  createStaff,
  getStaffs,
  getStaffsCount,
  getStaffsVerifiedCount,
  getStaff,
  editStaff,
  deleteStaff,
} = require('../../controllers/staffController');

module.exports = function () {
  router.post('/', canEdit, createStaff);
  router.get('/', getStaffs);
  router.get('/count', getStaffsCount);
  router.get('/verified-count', getStaffsVerifiedCount);
  router.get('/:staffId', getStaff);
  router.put('/:staffId', canEdit, editStaff);
  router.delete('/:staffId', canEdit, deleteStaff);

  return router;
};
