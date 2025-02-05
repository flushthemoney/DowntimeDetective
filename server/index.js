const express = require("express");
const dotenv = require("dotenv");
const cron = require("cron");
const UptimeService = require("./services/uptimeService"); // Import UptimeService
const logger = require("./utils/logger");
const uptimeRoutes = require("./routes/uptimeRoutes");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Routes
app.use("/api", uptimeRoutes);

// const job = new cron.CronJob(process.env.CHECK_INTERVAL, async () => {
//   const status = await UptimeService.checkUptime();
//   logger.info(`Scheduled check: Instagram is ${status}`);
// });

//job.start();

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
