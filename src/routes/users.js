'use strict';

const express = require('express');
const utils = require('../utils');
const auth = require('basic-auth');
const router = express.Router();
const User = require('../models/user').User;

router.get('/', utils.getAuthenticatedUser, (req, res, next) => {
    res.json(req.currentUser);
});

router.post('/', (req, res, next) => {
    User.create(req.body, (err, user) => {
        if (!req.body.emailAddress || !req.body.fullName) {
            err.status = 400;
        }
        if (err) {
            if (err.name === "MongoError" && err.code === 11000) {
                err = new Error('A user already exists with that email. Please supply a unique email.');
                err.status = 400;
                return next(err);
            } else {
                return next(err);
            }
        }
        res.location('/');
        res.status(201).json();
    });
});

module.exports = router;