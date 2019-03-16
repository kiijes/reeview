const Review = require('../models/Review');

exports.addOrUpdateReview = (req, res) => {
    if (
        req.params.movie_id === undefined ||
        req.body.score === undefined ||
        req.body.user_id === undefined
    ) {
        console.log(req.body);
        return res.status(400).send({
            message: 'Request is missing info'
        });
    }

    Review.findOneAndUpdate({ 'movie_id': req.params.movie_id, 'user_id': req.body.user_id }, {
        'movie_id': req.params.movie_id,
        'user_id': req.body.user_id,
        'score': req.body.score
    }, { new: true })
        .then(review => {
            if (!review) {
                console.log('No review found, adding new one');
                const review = new Review();
                review.movie_id = req.params.movie_id;
                review.user_id = req.body.user_id;
                review.score = req.body.score;
                review.save()
                    .then(data => {
                        return res.status(200).send(data);
                    }).catch(err => {
                        return res.status(500).send({
                            message: err.message || 'Some error occurred adding review'
                        });
                    });
            } else {
                res.status(200).send(review);
            }
        }).catch(err => {
            return res.status(500).send({
                message: err.message || 'Some error occurred updating review'
            });
        });
}

exports.getUserReview = (req, res) => {
    Review.findOne({ 'movie_id': req.params.movie_id, 'user_id': req.params.user_id })
        .then(review => {
            if (!review) {
                return res.send({
                    message: 'No review to movie id ' + req.params.movie_id + ' found for user id ' + req.params.user_id
                });
            }
            res.status(200).send(review);
        }).catch(err => {
            return res.status(500).send({
                message: 'Some error occurred retrieving review: ' + err.message
            });
        });
}

exports.getReviewScore = (req, res) => {
    Review.aggregate()
        .match({ 'movie_id': req.params.movie_id })
        .group({ _id: null, total: { $avg: '$score' } })
        .exec(function(err, reviews) {
            if (err) {
                throw err;
            }
            res.status(200).send(reviews);
        });
}

exports.deleteReview = (req, res) => {
    Review.findOneAndRemove({ 'user_id': req.params.user_id, 'movie_id': req.params.movie_id })
        .then(review => {
            if (!review) {
                return res.status(404).send({
                    message: 'No reviews to movie id ' + req.params.movie_id + ' found with user id ' + req.params.user_id
                });
            }
            return res.status(200).send({
                message: 'Review deleted succesfully'
            });
        }).catch(err => {
            if (err.kind === 'string' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: 'No reviews to movie id ' + req.params.movie_id + ' found with user id ' + req.params.user_id
                });
            }
            console.log('Could not delete review, error: ' + err.message);
            return res.status(500).send({
                message: 'Some error occurred deleting review'
            });
        });
}

exports.deleteAllReviews = (id) => {
    Review.deleteMany({ 'movie_id': id }, function(err) {
        if (err) {
            throw err;
        }
        console.log('Deleted all reviews of movie id ' + id);
    });
}