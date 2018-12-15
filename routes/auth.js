const express = require ('express');
const router = express.Router();
const User = require('../models/user-model');
const passport = require('passport');

router.post('/register', async (req, res, next) => {
    User.register({username: req.body.username}, req.body.password, (err, account)=>{
        res.send('Saved!');
    })
});

router.post('/local', passport.authenticate('local', {
    sucsessRedirect: '/',
    failureRedirect: 'auth/login'
 }));
module.exports = router;