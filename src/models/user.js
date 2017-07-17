'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullName: { type: String, required: '{PATH} is required.' },
    emailAddress: {
        type: String,
        required: '{PATH} is required.',
        unique: true,
        validate: {
            validator: value => {
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
            },
            message: '{VALUE} is invalid. You must enter a valid email. ex. someone@someServer.com'
        }
    },
    password: { type: String },
});

UserSchema.statics.authenticate = function(email, password, callback) {
    User.findOne({ emailAddress: email })
        .exec((err, user) => {
            if (err) {
                return callback(err);
            } else if (!user) {
                err = new Error('User Not Found');
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(password, user.password, (err, result) => {
                return result ? callback(null, user) : callback(err);
            });
        });
};

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10, (err, hash) => {
        if (err) { return next(err); }
        this.password = hash;
        next();
    });
});

const User = mongoose.model('User', UserSchema);

module.exports.User = User;