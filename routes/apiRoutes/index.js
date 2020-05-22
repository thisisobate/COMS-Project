const router = require("express").Router();
const adminRoutes = require("./adminRoutes");
const admin2Routes = require("./admin2Routes");
const studentRoutes = require("./studentRoutes");
const staffRoutes = require("./staffRoutes");

module.exports = function(app) {
  router.get("/test", (req, res) => {
    res.send("yehh!");
  });
  
  router.use("/admins", adminRoutes());
  router.use("/admin", admin2Routes());
  router.use("/students", studentRoutes());
  router.use("/staffs", staffRoutes());

  router.get("/", (req, res) => {
    res.status(200).sendFile(path.resolve("public/"));
  });

  return router;
};
