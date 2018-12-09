const commentModel = require('../models/comment-model');

  async function findAll() { 
    return commentModel.find();
}

async function add(comments) {
    return commentModel.create(comments);
}

module.exports = {
    findAll,
    add
};


