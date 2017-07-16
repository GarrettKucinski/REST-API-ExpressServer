'use strict';

const mongoose = require('mongoose');
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

const User = mongoose.model('User', UserSchema);

module.exports.User = User;