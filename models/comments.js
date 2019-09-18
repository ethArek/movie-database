const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const CommentSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    required: true,
    ref: "users"
  },
  movie: {
    type: ObjectId,
    required: true,
    ref: "movies"
  },
  text: {
    type: String,
    required: true,
    minlength: [10, "Komentarz musi mieć co najmniej 10 znaków"]
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Comment = mongoose.model("comments", CommentSchema);

module.exports = Comment;
