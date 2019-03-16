const User = require('../models/User');
const validator = require('validator');

exports.register = (req, res) => {
    if (
        req.body.username === undefined ||
        req.body.email === undefined ||
        req.body.password === undefined ||
        req.body.isRegistered === undefined ||
        req.body.isAdmin === undefined
    ) {
        return res.status(400).send({
            message: 'All fields are required to be filled and valid'
        });
    } else if (!validator.isEmail(req.body.email)) {
        return res.status(400).send({
            message: 'Email is not valid'
        });
    } else {
        User.findOne({ 'email': req.body.email }, function (err, user) {
            if (err) {
                throw err;
            }
    
            if (user) {
                return res.status(400).send({
                    message: 'Email is already in use'
                });
            } else {
                User.findOne({ 'username': req.body.username }, function (err, user) {
                    if (err) {
                        throw err;
                    }
            
                    if (user) {
                        return res.status(400).send({
                            message: 'Name is already in use'
                        });
                    } else {
                        const user = new User();
                        user.username = req.body.username;
                        user.email = req.body.email;
                        user.password = user.generateHash(req.body.password);
                        user.isRegistered = true;
                        user.isAdmin = req.body.isAdmin;

                        user.save()
                            .then(data => {
                                return res.status(200).send(data);
                            }).catch(err => {
                                return res.status(500).send({
                                    message: err.message || 'Some error occurred while registering user'
                                });
                        });
                    }
                });
            }
        });
    }
}