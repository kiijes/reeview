const Comment = require('../models/Comment');
const validator = require('validator');

exports.addOrUpdateComment = (req, res) => {
    if (
        req.params.movie_id === undefined ||
        req.body.comment === undefined ||
        req.body.user_id === undefined,
        req.body.user === undefined
    ) {
        console.log(req.body);
        return res.status(400).send({
            message: 'Request is missing info'
        });
    } else if (req.body._id) {
        Comment.findById(req.body._id, function(err, comment) {
            if (err) {
                throw err;
            }
            if (!comment) {
                return res.status(404).send({
                    message: 'Comment not found'
                });
            }
            if (comment.comment === req.body.comment) {
                return res.status(400).send({
                    message: 'Nothing was edited'
                });
            }
            comment.comment = validator.escape(req.body.comment);
            comment.editDate = Date.now();
            comment.editedBy = req.body.user;
            comment.save()
                .then(data => {
                    return res.status(200).send(data);
                }).catch(err => {
                    return res.status(500).send({
                        message: err.message || 'Some error occurred while editing comment'
                    });
                });
        });
    } else {
        const comment = new Comment();
        comment.movie_id = req.params.movie_id;
        comment.comment = validator.escape(req.body.comment);
        comment.user_id = req.body.user_id;
        comment.user = req.body.user;
        comment.save()
            .then(data => {
                return res.status(200).send(data);
            }).catch(err => {
                return res.status(500).send({
                    message: err.message || 'Some error occurred while adding comment'
                });
            });
    }

}

exports.getComments = (req, res) => {
    Comment.find({ 'movie_id': req.params.movie_id }).sort('date').exec(function(err, comments) {
        if (err) {
            throw err;
        }
        res.status(200).send(comments);
    })
}

exports.deleteAllComments = (id) => {
    Comment.deleteMany({ 'movie_id': id }, function(err) {
        if (err) {
            throw err;
        }
        console.log('Deleted all comments from movie id ' + id);
    });
}

exports.deleteComment = (req, res) => {
    if (
        req.params.comment_id === null ||
        req.params.user_id === null
    ) {
        console.log('USER ID OR COMMENT ID IS NULL');
        return res.status(400).send({
            message: 'Comment or user id is undefined'
        });
    }
    Comment.findById(req.params.comment_id, function(err, comment) {
        if (err) {
            throw err;
        }
        if (!comment) {
            return res.status(404).send({
                message: 'Comment not found'
            });
        }
        if (comment.user_id === req.params.user_id) {
            Comment.findByIdAndDelete(req.params.comment_id, function(err, comment) {
                if (err) {
                    throw err;
                } else {
                    return res.status(200).send({
                        message: 'Deleted comment id ' + comment._id + ' succesfully'
                    });
                }
            });
        } else {
            console.log('Comment is not by this user, not deleting');
            return res.status(400).send({
                message: 'Comment not by this user, not deleting'
            });
        }
    });
}