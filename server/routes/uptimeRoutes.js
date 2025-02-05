const express = require("express");
const UptimeController = require("../controllers/uptimeController");

const router = express.Router();

router.get("/uptime", UptimeController.getUptime);

module.exports = router;
