const express = require("express");
const dotenv = require("dotenv");
const logger = require("./utils/logger");
const uptimeRoutes = require("./routes/uptimeRoutes");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8001;

app.use(express.json());
app.use(cors());

// Routes
app.use("/api", uptimeRoutes);

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
