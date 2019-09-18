const router = require("express").Router();

const Comment = require("../../models/comments.js");
const Movie = require("../../models/movies.js");

const auth = require("../../middlewares/authentication.js");

router.post("/", auth, async (req, res) => {
  try {
    const body = {
      user: req.user._id,
      movie: req.body.movie_id,
      text: req.body.text
    };

    if (!body.movie) {
      //if no movie_id is provided then get first one. I did that for you so you do not have to copy _id from movie
      const movie = await Movie.findOne();
      body.movie = movie._id;
    }

    const comment = new Comment(body);
    await comment.save();
    res.json({ success: true, message: "Komentarz został dodany" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate("user")
      .populate("movie")
      .exec();

    res.json({ success: true, data: comments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
