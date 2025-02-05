const UptimeService = require("../services/uptimeService");

class UptimeController {
  static async getUptime(req, res) {
    const { url } = req.query; // Extract URL from query parameters
    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    try {
      const status = await UptimeService.checkUptime(url); // Pass the URL to the service
      res.status(200).json({ status });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = UptimeController;
