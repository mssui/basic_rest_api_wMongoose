const userModel = require('../models/user-model');

async function findUser(id) {
    return userModel.findOne({id});
}
async function find(params) { 
    return postModel.find(params)
}

module.exports = {
    findUser,
    find
};
