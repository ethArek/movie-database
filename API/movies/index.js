const router = require("express").Router();
const request = require("request-promise");

const { omdbApi } = require("../../config/config.js");
const Movie = require("../../models/movies.js");
const auth = require("../../middlewares/authentication.js");

router.post("/", auth, async (req, res) => {
  if (req.body.title || req.body.imdbId) {
    try {
      const requestOptions = {
        uri: omdbApi.url,
        qs: {
          apiKey: omdbApi.key,
          t: req.body.title
        },
        headers: {
          "User-Agent": "Request-Promise"
        },
        json: true
      };

      const response = await request(requestOptions);
      res.send(response);
    } catch (err) {
      res.status(500).json({ success: false, message: "Problemy z serwerem" });
    }
  } else {
    res
      .status(422)
      .json({ success: false, message: "Musisz podać tytuł lub id" });
  }
});

module.exports = router;
