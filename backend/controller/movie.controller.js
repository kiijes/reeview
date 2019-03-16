const Movie = require('../models/Movie');
const ReviewControl = require('../controller/review.controller');
const CommentControl = require('../controller/comment.controller');
const validator = require('validator');

exports.addMovie = (req, res) => {
    if (
        !req.body.title ||
        !req.body.year  ||
        !req.body.director
    ) {
        return res.status(400).send({
            message: 'All fields are required to be filled and valid'
        });
    } else if (typeof req.body.year !== "number") {
        return res.status(400).send({
            message: 'Year is not valid'
        });
    } else {
        Movie.findOne({ 'title': req.body.title }, function (err, movie) {
            if (err) {
                throw err;
            }

            if (movie && movie.director === req.body.director && movie.year === req.body.year) {
                return res.status(400).send({
                    message: 'This movie already exists'
                });
            } else {
                const movie = new Movie();
                movie.title = req.body.title;
                movie.director = req.body.director;
                movie.year = req.body.year;

                movie.save()
                    .then(data => {
                        return res.status(200).send(data);
                    }).catch(err => {
                        return res.status(500).send({
                            message: err.message || 'Some error occurred while adding movie'
                        });
                    });
            }
        });
    }
}

exports.editMovie = (req, res) => {

    if (
        !req.body.title ||
        !req.body.year  ||
        !req.body.director
    ) {
        return res.status(400).send({
            message: 'All fields are required to be filled and valid'
        });
    } else if (typeof req.body.year !== "number") {
        return res.status(400).send({
            message: 'Year is not valid'
        });
    } else if (req.params.movie_id) {
        Movie.findById(req.params.movie_id, function(err, movie) {
            if (err) {
                throw err;
            }
            if (!movie) {
                return res.status(404).send({
                    message: 'Movie not found'
                });
            }
            movie.title = req.body.title;
            movie.year = req.body.year;
            movie.director = req.body.director;
            movie.save()
                .then(data => {
                    return res.status(200).send(data);
                }).catch(err => {
                    return res.status(500).send({
                        message: err.message || 'Some error occurred while editing movie'
                    });
                });
        });
    } else {
        return res.status(400).send({
            message: 'No movie ID in request body'
        });
    }

}

exports.getMovie = (req, res) => {
    Movie.findById(req.params.id)
        .then(movie => {
            if (!movie) {
                return res.status(404).send({
                    message: 'Movie not found with ID ' + req.params.id
                });
            }
            res.send(movie);
        }).catch(err => {
            if (err.kind === 'string') {
                return res.status(404).send({
                    message: 'Movie not found with ID ' + req.params.id
                });
            }
            return res.status(500).send({
                message: 'Error retrieving movie with ID ' + req.params.id
            });
        });
}

exports.getLatest = (req, res) => {
    Movie.find({}).sort('-date').limit(5).exec(function(err, movies) {
        if (err) {
            throw err;
        }
        res.status(200).send(movies);
    });
}

exports.getAll = (req, res) => {
    Movie.find({}, function(err, movies) {
        if (err) {
            throw err;
        }
        res.status(200).send(movies);
    });
}

exports.movieSearch = (req, res) => {
    Movie.find({ 'title':  { '$regex': req.body.search, '$options': 'i' } })
        .limit(50)
        .exec(function(err, results) {
            if (err) {
                throw err;
            }
            if (!results) {
                res.status(404).send({
                    message: 'No results found'
                });
            }
            res.status(200).send(results);
        });
}

exports.deleteMovie = (req, res) => {
    Movie.findOneAndRemove({ '_id': req.params.id })
        .then(movie => {
            if (!movie) {
                console.log('Movie not found');
                return res.status(404).send({
                    message: 'Movie with ID ' + req.params.id + ' not found'
                });
            }
            ReviewControl.deleteAllReviews(req.params.id);
            CommentControl.deleteAllComments(req.params.id);
            console.log('Movie deleted');
            res.status(200).send({message: 'Movie deleted succesfully'});
        }).catch(err => {
            if (err.kind === 'string' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: 'Movie not found with student code ' + req.params.id
                });
            }
            console.log('Could not delete movie');
            return res.status(500).send({
                message: 'Could not delete movie with id ' + req.params.id
            });
        });

    
}