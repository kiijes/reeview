var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const Comments = new Schema({
    movie_id: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    user_id: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true,
        maxlength: 500
    },
    editDate: {
        type: Date,
        default: Date.now
    },
    editedBy: {
        type: String
    }
});

mongoose.model('Comment', Comments);
module.exports = mongoose.model('Comment');