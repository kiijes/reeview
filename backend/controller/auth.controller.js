var jwt = require('jsonwebtoken');
var config = require('../config/auth.config');
var User = require('../models/User');
var secret = config.secret;

exports.authenticate = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            password = '';
            if (!user) {
                return res.status(404).send({
                    message: 'User not found'
                });
            } else if (!user.validPassword(req.body.password)) {
                console.log('incorrect pass or username');
                return res.status(403).send({
                    message: 'Username or password incorrect'
                });
            } else {
                console.log('correct user and pass');

                const payload = {
                    'user_id': user._id,
                    'name': user.username,
                    'email': user.email,
                    'isRegistered': user.isRegistered,
                    'isAdmin': user.isAdmin
                }

                const token = jwt.sign(payload, secret, { expiresIn: 60 * 30 });

                res.status(200).send({
                    success: true,
                    message: 'Alla oleva merkkijono on JWT-tokenisi, ota se talteen.',
                    token: token
                });
            }
        }).catch(err => {
            if (err.kind === 'string') {
                return res.status(404).send({
                    message: 'User not found'
                });
            }
            return res.status(500).send({
                message: 'Error authenticating user'
            });
        });
}

exports.verifyToken = (req, res, next) => {
    var token = req.headers['x-access-token'] || req.body.token;

    if (!token) {
        return res.status(403).send({
            success: false,
            message: 'No token found in request'
        });
    }

    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) {
            return res.status(500).send({
                success: false,
                message: 'Failed to verify token'
            });
        }
        req.email = decoded.email;
        next();
    })
}