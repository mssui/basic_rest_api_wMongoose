const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyparser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;;
const session = require('express-session');
const User = require('./models/user-model');

mongoose.Promise = global.Promise;
const port = process.env.PORT || 3030;
mongoose.connect('mongodb://localhost/aslitest');

var app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.use(session({
    secret: 'hernameislola',
    resave: true,
    saveUninitialized : true
}))
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));
  
app.use('/', require('./routes/api'));
app.use('/auth', require('./routes/auth'));

app.listen(port, ()=>{
    console.log('Server is running on:', port)
});

