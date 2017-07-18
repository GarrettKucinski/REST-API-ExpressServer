'use strict';

const express = require('express');
const router = express.Router();
const utils = require('../utils');
const Course = require('../models/course').Course;
const Review = require('../models/review').Review;

router.param('courseID', (req, res, next, id) => {
    Course.findById(id)
        .populate({
            path: 'user',
            select: 'fullName -_id'
        })
        .populate({
            path: 'reviews',
            select: 'user -_id',
            populate: {
                path: 'user',
                model: 'User',
                select: 'fullName'
            }
        })
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
        if (err) { return next(err); }
        res.json(courses);
    });
});

router.post('/', utils.getAuthenticatedUser, (req, res, next) => {
    if (!req.body.title || !req.body.description) {
        const err = new Error('You must provide a title and description.');
        err.status = 400;
        next(err);
    }

    req.body.steps.filter(step => {
        if (!step.title || !step.description) {
            const err = new Error('You must provide a title and description for each step.');
            err.status = 400;
            return next(err);
        }
    });

    const course = new Course(req.body);
    course.save((err, course) => {
        if (err) { return next(err); }
        res.status(201).send();
    });
});

router.get('/:courseID', (req, res, next) => {
    res.json(req.course);
});

router.put('/:courseToUpdateID', utils.getAuthenticatedUser, (req, res, next) => {
    Course.findByIdAndUpdate(req.body._id, req.body, { upsert: true }, (err, course) => {
        if (err) { return next(err); }
        res.status(204).send();
    });
});

router.post('/:courseID/reviews', utils.getAuthenticatedUser, (req, res, next) => {
    if (!req.body.rating) {
        const err = new Error('You must supply a rating to review a course.');
        err.status = 400;
        next(err);
    }

    Review.create(req.body, (err, review) => {
        if (err) { return next(err); }
        req.course.reviews.push(review._id);
        req.course.save((err, course) => {
            if (err) { return next(err); }
        });
        res.location('/');
        res.status(201).send();
    });
});

module.exports = router;