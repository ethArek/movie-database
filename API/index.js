const router = require("express").Router();

const moviesRoutes = require("./movies");
const commentsRoutes = require("./comments");

router.use("/movies", moviesRoutes);
router.use("/comments", commentsRoutes);

module.exports = router;
