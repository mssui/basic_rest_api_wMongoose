const express = require ('express');
const router = express.Router();
const User = require('../models/user-model');
const passport = require('passport');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

// Login Route
router.post('/login', passport.authenticate('local'), function(req, res, next) {
    if (req.isAuthenticated())  { res.redirect('/profile') } else{res.redirect('/login')}
    
});

//logout Route
// router.get('/logout', function (req, res) { 
//   req.logOut(); // remove all session data 
//   req.session = null; 
//   res.redirect('/');
//    });

   router.get('/logout', async (req, res) => {
    await req.logout();
    req.session = null;
    return res.send({ message: "You have sucsessfully logged out." });
  })
  
// Register Route

router.post('/register', function(req, res) {
    User.register(new User({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
          return res.send("Sorry. That username already exists. Try again.");
        }
        passport.authenticate('local')(req, res, function () {
          res.redirect('/');
        });
    });
});

//Logout
// router.get('/logout', function (req, res){
//   req.logout();
//   req.session.destroy(function (err) {
//     res.redirect('/');
//   }); 
  
// });



// Restricted Routes

router.all("*", function(req, res, next){
    if (!req.user) 
      res.send(403);
    else
      next();
  });


router.get('/mypage', function(req, res, next){
    res.send('MY PAGE');
   
});


module.exports = router;