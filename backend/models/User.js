var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
const Users = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 128
    },
    isRegistered: {
        type: Boolean,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
});

Users.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

Users.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

mongoose.model('User', Users);
module.exports = mongoose.model('User');