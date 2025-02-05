const axios = require("axios");
const logger = require("../utils/logger");
const { URL } = require("url"); // Use Node's built-in URL module for validation

class UptimeService {
  static async checkUptime(inputUrl) {
    try {
      // Ensuring that the url has a protocol
      let url = inputUrl.trim(); // Remove any leading/trailing whitespace
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = `https://${url}`; // Prepend https:// if no protocol is provided
      }

      new URL(url);

      const response = await axios.get(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
        maxRedirects: 5,
      });

      logger.info(`Response Status for ${url}: ${response.status}`);
      const status = response.status === 200 ? "UP" : "DOWN";
      logger.info(`${url} is ${status}`);
      return status;
    } catch (error) {
      logger.error(`Error checking ${inputUrl}: ${error.message}`);
      if (error.response) {
        logger.error(`Response Status: ${error.response.status}`);
        logger.error(`Response Data: ${error.response.data}`);
      } else if (error.request) {
        logger.error("No response received from the server");
      } else if (error instanceof TypeError) {
        logger.error("Invalid URL provided");
      } else {
        logger.error("Error setting up the request");
      }
      return "DOWN";
    }
  }
}

module.exports = UptimeService;
