'use strict';

const express = require('express');
const router = express.Router();
const Course = require('../models/course').Course;
const Review = require('../models/review').Review;

router.param('courseID', (req, res, next, id) => {
    Course.findById(id)
        .populate('user')
        .populate('reviews')
        .exec((err, course) => {
            if (err) { return next(err); }
            if (!course) {
                err = new Error('Not Found');
                err.status = 404;
                return next(err);
            }
            req.course = course;
            return next();
        });
});

router.get('/', (req, res, next) => {
    Course.find({}, { title: true }).exec((err, courses) => {
        res.json(courses);
    });
});

router.post('/', (req, res, next) => {
    if (!req.body.title ||
        !req.body.description) {
        const err = new Error('You must provide a title and description.');
        err.status = 400;
        next(err);
    }
    for (let i = 0; i < req.body.steps.length; i += 1) {
        if (!req.body.steps[i].title || !req.body.steps[i].description) {
            const err = new Error('You must provide a title and description for each step.');
            err.status = 400;
            next(err);
        }
    }
    const course = new Course(req.body);
    course.save((err, course) => {
        if (err) { return next(err); }
        res.status(201).send();
    });
});

router.get('/:courseID', (req, res, next) => {
    res.json(req.course);
});

router.put('/:courseID', (req, res, next) => {
    res.json({
        message: 'Updates the course with the specified ID.'
    });
});

router.post('/:courseID/reviews', (req, res, next) => {
    Review.create(req.body, (err, review) => {
        if (err) { return next(err); }
        req.course.reviews.push(review._id);
        req.course.save((err, course) => {
            if (err) { return next(err); }
        });
        res.status(201).send();
    });

});

module.exports = router;