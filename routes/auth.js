const express = require ('express');
const router = express.Router();
const User = require('../models/user-model');

router.post('/register', async (req, res, next) => {
    User.register({username: req.body.username}, req.body.password, (err, account)=>{
        res.send('Saved!');
    })
});

module.exports = router;