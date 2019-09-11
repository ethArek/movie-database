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
    minlength: [10, "Comment has to be at least 10 characters long"]
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Comment = mongoose.model("comment", CommentSchema);

module.exports = Comment;
