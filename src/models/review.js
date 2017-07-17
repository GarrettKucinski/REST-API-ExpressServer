'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    postedOn: { type: Date, default: Date.now },
    rating: { type: Number, min: 1, max: 5, required: true },
    review: String
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports.Review = Review;