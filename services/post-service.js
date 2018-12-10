const postModel = require('../models/posts-model');

  async function findAll() { 
    return postModel.find();
}

async function add(Posts) {
    return postModel.create(Posts);
}

async function findOne(id) {
    return postModel.findOne({id});
}


async function findById(id) {
    return postModel.findOne(id);
}

async function findPost(params) { 
    return  Posts.findById(params).populate('comments')
}


module.exports = {
    findAll,
    add,
    findOne,
    findById,
    findPost
};
