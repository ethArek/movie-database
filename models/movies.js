const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  rating: {
    type: String
  },
  releaseDate: {
    type: Date
  },
  plot: {
    type: String
  },
  actors: {
    type: String
  },
  duration: {
    type: String
  },
  genre: {
    type: String
  },
  imdbRating: {
    type: Number
  },
  boxOffice: {
    type: String
  },
  posterImage: {
    type: String
  }
});

const Movie = mongoose.model("movie", MovieSchema);

module.exports = Movie;
