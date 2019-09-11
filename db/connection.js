const mongoose = require("mongoose");
const { mongoUrl } = require("../config/config.js");

mongoose.connect(
  mongoUrl,
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;

module.exports = mongoose;
