'use strict';

const auth = require('basic-auth');
const User = require('../models/user').User;

const getAuthenticatedUser = (req, res, next) => {
    const user = auth(req);

    if (!user) {
        const err = new Error('Could not authenticate, user not found.');
        err.status = 403;
        return next(err);
    } else {
        User.authenticate(user.name, user.pass, (err, currentUser) => {
            if (err) {
                err = new Error('You are not authorized to make this request.');
                err.status = 403;
                return next(err);
            }
            req.currentUser = currentUser;
            next();
        });
    }
};

module.exports.getAuthenticatedUser = getAuthenticatedUser;