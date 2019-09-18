const router = require("express").Router();

const Comment = require("../../models/comment.js");

router.post("/", auth, async (req, res) => {
  try {
    const body = {
      user: req.user._id,
      movie: req.body.movie_id,
      text: req.body.text
    };

    const comment = new Comment(body);
    await comment.save();
    res.json({ success: true, message: "Komentarz został dodany" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json({ success: true, data: comments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
