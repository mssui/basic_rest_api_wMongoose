const postModel = require('../models/posts-model');

  async function findAll() { 
    return postModel.find();
}

async function add(Posts) {
    return postModel.create(Posts);
}

module.exports = {
    findAll,
    add
};