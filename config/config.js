const mongoUrl = "mongodb://localhost:27017/movie-database";

const omdbApi = {
  url: "http://www.omdbapi.com/",
  key: "a6984b0"
};

const jwtSecret = "b798f7219afd4533bbab6d0632c4c5b8";

module.exports = { mongoUrl, omdbApi, jwtSecret };
