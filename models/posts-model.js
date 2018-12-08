const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// create post Schema

 const PostSchema = new Schema({
    title:  String,
    slug: String,
    comments: [
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Comment"
      }    
  ],
  addedBy: {
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    username: String
  },
    hidden: {
        type: Boolean,
        default: false
    },
    meta: {
      votes: Number,
      favs:  Number
    }
  });


  // Turn that schema to a model
module.exports = mongoose.model('posts', PostSchema); 

