const router = require("express").Router();
const path = require('path');

module.exports = function(app) {
  router.get("/", (req, res) => {
    res.status(200).sendFile(path.resolve("public/staff/"));
  });

  router.get("/admin", (req, res) => {
    res.status(200).sendFile(path.resolve("public/staff/admin.html"));
  });

  router.get("/login", (req, res) => {
    res.status(200).sendFile(path.resolve("public/staff/login.html"));
  });

  return router;
};
