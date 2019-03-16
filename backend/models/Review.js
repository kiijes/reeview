var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const Reviews = new Schema({
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
    score: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    }
});

mongoose.model('Review', Reviews);
module.exports = mongoose.model('Review');