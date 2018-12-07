const express = require ('express');
const router = express.Router();
const Posts = require('../services/post-service');


// get a list of posts from the db

      router.get('/', async (req, res, next) => {
        
        const postMap = await Posts.findAll();   
        let userInfo = []; 
        // For loop to filter the main data from postMap
        for (var i = 0; i < postMap.length; i++) {
            userInfo.push({
                title: postMap[i].title,
                slug: postMap[i].slug,
                id: postMap[i].id,
                comments : postMap[i].comments
            });
        }
        res.send(userInfo);
        // Or we can use map method like below commented out.
        // const other = postMap.map((data)=>{return data.title;});
        // res.send(other);
    });

    
// add a new post to the db
router.post('/add', async (req, res, next) => {
    const newpost = await Posts.add(req.body);
    res.send(newpost);
});


// update a post in the db
router.put('/posts/:id', function(req, res, next){
    Posts.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Posts.findOne({_id: req.params.id}).then(function(post){
            res.send(post);
        });
    }).catch(next);
});

// delete a post from the db
router.delete('/posts/:id', function(req, res, next){
    Posts.findByIdAndRemove({_id: req.params.id}).then(function(post){
        res.send(post);
    }).catch(next);
});

module.exports = router;