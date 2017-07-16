'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: '{PATH} is required.' },
    description: { type: String, required: '{PATH} is required.' },
    estimatedTime: String,
    materialsNeeded: String,
    steps: [{
        stepNumber: Number,
        title: { type: String, required: '{PATH} is required.' },
        description: { type: String, required: '{PATH} for step is required.' }
    }],
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
});


const Course = mongoose.model('Course', CourseSchema);

module.exports.Course = Course;