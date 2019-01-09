const commentModel = require('../models/comment-model');

async function findAll() {
  return commentModel.find();
}
async function add(comments) {
  return commentModel.create(comments);
}
async function find(params) {
  return commentModel.find(params);
}
module.exports = {
  findAll,
  add,
  find,
};


