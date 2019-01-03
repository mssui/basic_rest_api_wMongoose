const express = require ('express');
const router = express.Router();
const User = require('../models/user-model');
const passport = require('passport');

// router.get('/login', (req, res, next) => {
//     // const data: {
//     //     otherData: 'Something Else' 
//     // };
//     req.vueOptions( {
//         head: {
//             title: 'Page Title',
//             metas: [
//                 { property:'og:title', content: 'Page Title'},
//                 { name:'twitter:title', content: 'Page Title'},
//             ]
//         }    
//     }),
//     res.renderVue('login.vue', data, req.vueOptions);
// });



    // router.get("/login",
    //     (req, res) => {
    //         const data = {
    //             title: "Oh hi world!",
    //         };
    //         req.vueOptions.head.title = "Express-Vue MVC Starter Kit";
    //         res.renderVue("@/client/src/views/login.vue", data, req.vueOptions);
    //     },
    // );



    router.post('/login',
    passport.authenticate('local'),
    function(req, res) {
      // If this function gets called, authentication was successful.
      res.redirect('/users/' + req.user.username);
    });


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