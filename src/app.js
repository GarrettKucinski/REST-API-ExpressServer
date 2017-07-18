'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bluebird = require('bluebird');
const seeder = require('mongoose-seeder');
const data = require('./data/data.json');
const User = require('./models/user');
const Review = require('./models/review');
const Course = require('./models/course');


const app = express();

// Import routes for use in the app
const coursesRoute = require('./routes/courses');
const usersRoute = require('./routes/users');

// set our port
app.set('port', process.env.PORT || 5000);

// morgan gives us http request logging
app.use(morgan('dev'));

// setup our static route to serve files from the "public" folder
app.use('/', express.static('public'));

// Set mongoose promise library to bluebird unstead of default 
// connect to mongodb through mongoose
mongoose.Promise = bluebird;
mongoose.connect("mongodb://localhost:27017/courseRatings", {
    useMongoClient: true
});

// Store a reference to the mongoose connection
const db = mongoose.connection;

// If an error occurs let us know
db.on('error', err => {
    console.log('Houston, we have a problem.');
});

// If not let us know that we have a db connection
db.on('open', () => {
    seeder.seed(data, {}, () => {
        console.log('Database Seeded');
    }).then(dbData => {

    }).catch(err => {
        console.log(err);
    });
    console.log('Houston, we have ignition.');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/courses', coursesRoute);
app.use('/api/users', usersRoute);

// catch 404 and forward to global error handler
app.use(function(req, res, next) {
    const err = new Error('File Not Found');
    err.status = 404;
    next(err);
});

// Express's global error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});

// start listening on our port
const server = app.listen(app.get('port'), function() {
    console.log('Express server is listening on port ' + server.address().port);
});

module.exports = app;