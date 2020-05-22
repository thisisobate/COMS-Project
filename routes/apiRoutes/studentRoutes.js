const router = require('express').Router();
const {canEdit} = require('../../middlewares/auth')
const {
  createStudent,
  getStudents,
  getStudentsCount,
  getStudentsVerifiedCount,
  getStudent,
  editStudent,
  deleteStudent,
} = require('../../controllers/studentController');

module.exports = function () {
  router.post('/', canEdit, createStudent);
  router.get('/', getStudents);
  router.get('/count', getStudentsCount);
  router.get('/verified-count', getStudentsVerifiedCount);
  router.get('/:studentId', getStudent);
  router.put('/:studentId', canEdit, editStudent);
  router.delete('/:studentId', canEdit, deleteStudent);

  return router;
};
