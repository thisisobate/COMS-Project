const Student = require("../models/student");
const CustomError = require("../helpers/CustomError");

class StudentService {
  async createStudent(data) {
    if (await Student.findOne({ email: data.email }))
      throw new CustomError("email already exists");
    const student = new Student(data);
    await student.save();
  }

  async getStudent(_id) {
    const student = await Student.findOne({ _id });

    return student;
  }

  async getStudents() {
    const students = await Student.find({});

    return students;
  }

  async getStudentsCount() {
    const students = await Student.find({}).count();

    return students;
  }

  async getStudentsVerifiedCount() {
    const students = await Student.find({feesStatus : "paid"}).count();

    return students;
  }

  async editStudent(_id, data) {
    const student = await Student.findOneAndUpdate({ _id }, data);

    return student;
  }

  async deleteStudent(_id) {
    const student = await Student.findOneAndRemove({ _id });

    return student;
  }
}

module.exports = new StudentService();
