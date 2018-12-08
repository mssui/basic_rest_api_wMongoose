const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// create post Schema


var commentSchema = new Schema({
  text: String,
  author: {
      id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
      },
      username: String
  },
  meta: {
    votes: Number,
    favs:  Number
  }
});

module.exports = mongoose.model("Comment", commentSchema);
