const router = require("express").Router();
const request = require("request-promise");
const moment = require("moment");

const { omdbApi } = require("../../config/config.js");
const Movie = require("../../models/movies.js");
const auth = require("../../middlewares/authentication.js");
// require("../../db/connection.js");

router.post("/", async (req, res) => {
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
      console.log("here");
      const response = await request(requestOptions);
      if (response.Response === "True") {
        const body = {
          title: response.Title,
          year: response.Year,
          rating: response.Rated,
          releaseDate: response.releaseDate
            ? moment(response.releaseDate, "DD MMM YYYY").toDate()
            : null,
          plot: response.Plot,
          actors: response.Actors,
          duration: response.Runtime,
          genre: response.Genre,
          imdbRating: response.imdbRating,
          boxOffice: response.BoxOffice,
          posterImage: response.Poster !== "N/A" ? response.Poster : null
        };

        const movie = new Movie(body);
        await movie.save();
        res.json({
          success: true,
          message: "Film został dodany do bazy",
          movie_id: movie._id
        });
      } else {
        res.status(422).json({
          success: false,
          message: "Niestety nie znaleziono filmu o podanych kryteriach"
        });
      }
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
