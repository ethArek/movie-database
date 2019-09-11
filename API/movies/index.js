const router = require("express").Router();
const request = require("request-promise");

const { omdbApi } = require("../../config/config.js");

router.get("/", async (req, res) => {
  try {
    const title = "harry potter";

    const requestOptions = {
      uri: omdbApi.url,
      qs: {
        apiKey: omdbApi.key,
        t: title
      },
      headers: {
        "User-Agent": "Request-Promise"
      },
      json: true
    };

    const response = await request(requestOptions);
    res.send(response);
  } catch (err) {
    res.send({ error: true });
  }
});

module.exports = router;
