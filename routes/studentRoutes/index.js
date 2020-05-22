const router = require("express").Router();
const path = require('path');

module.exports = function() {

  router.get("/", (req, res) => {
    res.status(200).sendFile(path.resolve("public/student/"));
  });

  router.get("/admin", (req, res) => {
    res.status(200).sendFile(path.resolve("public/student/admin.html"));
  });

  router.get("/login", (req, res) => {
    res.status(200).sendFile(path.resolve("public/student/login.html"));
  });

  return router;
};
