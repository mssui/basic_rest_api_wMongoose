const express = require ('express');
const router = express.Router();
const User = require('../models/user-model');
const passport = require('passport');


router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

// router.post('/register', function(req, res) {
//     User.register(new User({ username : req.body.username }), req.body.password, function(err, account) {
//         if (err) {
//           return res.send("Sorry. That username already exists. Try again.");
//         }
//         passport.authenticate('local')(req, res, function () {
//           res.redirect('/');
//         });
//     });
// });


module.exports = router;