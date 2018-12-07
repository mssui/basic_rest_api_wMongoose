const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// var ObjectId = mongoose.Schema.Types.ObjectId;


// Create Post Schema

var PostSchema = new Schema({
    title:  String,
    slug: String,
    comments: [{ 
        body: String, 
        date: Date, 
        author: String
        }],
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
const Posts = mongoose.model('posts', PostSchema); 

// Export the model
module.exports = Posts;

