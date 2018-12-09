const postModel = require('../models/posts-model');

  async function findAll() { 
    return postModel.find();
}

async function add(Posts) {
    return postModel.create(Posts);
}

async function findOne(id) {
    return postModel.findOne({id}).populate('comments');
}

module.exports = {
    findAll,
    add,
    findOne
};
