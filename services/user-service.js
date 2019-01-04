const userModel = require('../models/user-model');

async function findUser(id) {
    return userModel.findOne({id});
}


module.exports = {
    findUser
};
