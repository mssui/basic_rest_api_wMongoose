const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// create Comment Schema


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

var Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;

