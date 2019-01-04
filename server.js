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

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

  
app.use('/', require('./routes/api'));
app.use('/auth', require('./routes/auth'));


app.get('/auth/login', (req,res,next)=>{
  res.render({username : req.user.username})
}
);

app.listen(port, ()=>{
    console.log('Server is running on:', port)
});

