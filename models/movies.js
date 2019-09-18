const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const MovieSchema = new mongoose.Schema({
  imdbId: {
    type: String,
    index: true,
    unique: true,
    required: true
  },
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

MovieSchema.post("save", function(error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("Film już istnieje w bazie"));
  } else {
    next();
  }
});

const Movie = mongoose.model("movies", MovieSchema);

module.exports = Movie;
