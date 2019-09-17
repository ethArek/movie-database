const router = require("express").Router();

const moviesRoutes = require("./movies");
const commentsRoutes = require("./comments");
const usersRoutes = require("./users");

router.use("/movies", moviesRoutes);
router.use("/comments", commentsRoutes);
router.use("/users", usersRoutes);

module.exports = router;
