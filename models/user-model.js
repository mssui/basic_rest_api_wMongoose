
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

// create User Schema

const userSchema = new Schema({ },{strict:false}); // Not strict form of data
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);