var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const Movies = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 200
    },
    year: {
        type: Number,
        required: true
    },
    director: {
        type: String,
        required: true,
        maxlength: 100
    },
    date: {
        type: Date,
        default: Date.now
    }
});
Movies.index({'$**': 'text'});

mongoose.model('Movie', Movies);
module.exports = mongoose.model('Movie');