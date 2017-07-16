'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.json({
        message: 'Returns the currently authenticated user'
    });
});

router.post('/', (req, res, next) => {
    res.json({
        message: 'Creates a user, sets the Location header to "/" and returns no content.'
    });
});

module.exports = router;