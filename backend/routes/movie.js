var express = require('express');
var router = express.Router();
var Movie = require('../controller/movie.controller');
var Auth = require('../controller/auth.controller');
var Review = require('../controller/review.controller');
var Comment = require('../controller/comment.controller');

/* GET users listing. */
router.post('/add', Auth.verifyToken, Movie.addMovie);
router.put('/:movie_id/edit', Auth.verifyToken, Movie.editMovie);
router.get('/get/:id', Movie.getMovie);
router.get('/latest', Movie.getLatest);
router.get('/all', Movie.getAll);
router.post('/search', Movie.movieSearch);
router.delete('/delete/:id', Auth.verifyToken, Movie.deleteMovie);
router.get('/getreview/:movie_id/:user_id', Auth.verifyToken, Review.getUserReview);
router.put('/:movie_id/review', Auth.verifyToken, Review.addOrUpdateReview);
router.delete('/deletereview/:movie_id/:user_id', Auth.verifyToken, Review.deleteReview);
router.get('/:movie_id/review', Review.getReviewScore);
router.put('/:movie_id/comment', Auth.verifyToken, Comment.addOrUpdateComment);
router.get('/:movie_id/comment', Comment.getComments);
router.delete('/deletecomment/:comment_id/:user_id', Auth.verifyToken, Comment.deleteComment);

module.exports = router;
