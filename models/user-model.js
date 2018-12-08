
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// create post Schema

var userSchema = new Schema({
  username: String,
  password: String
});

module.exports = mongoose.model("User", userSchema);