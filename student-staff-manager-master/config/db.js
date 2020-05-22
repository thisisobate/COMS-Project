const mongoose = require('mongoose');
// const uri = "mongodb://127.0.0.1:27017/schoolProject"
const uri = "mongodb+srv://admin:admin@cluster0-zdljh.mongodb.net/test?retryWrites=true&w=majority"

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

module.exports = function initDB() {
  mongoose
    .connect(uri, options)
    .then(() => {
      console.log(':: connected to database');
    })
    .catch(error => {
      console.log(":: couldn't connect to database ", error);
    });
};
