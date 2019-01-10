const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;;
const session = require('express-session');
const User = require('./models/user-model');


mongoose.Promise = global.Promise;
const port = process.env.PORT || 3030;
mongoose.connect('mongodb://localhost/aslitest');

var app = express();

// app.set('view engine', 'html');


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(cookieParser())

app.use(session({ secret: 'hernameislola', saveUninitialized: false, resave: false, cookie: { maxAge: 1000 } }));
app.use('*', cors());
passport.serializeUser((user, done) => {
  done(null, user.id); // ID is enough to store
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
         done(null, user);
        });
 });

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));


  
app.use('/', require('./routes/api'));
app.use('/auth', require('./routes/auth'));
app.use('/profile', require('./routes/profile-route'));


app.get('/auth/login', (req,res,next)=>{
  res.render({username : req.user.username})
}
);

app.listen(port, ()=>{
    console.log('Server is running on:', port)
});

