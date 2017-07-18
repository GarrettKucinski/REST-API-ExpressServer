'use strict';

const request = require('supertest');

describe('POST /:courseID/reviews SAME USER', (done) => {
    it('should return a 403 error for a user trying to review their own course', () => {
        request('localhost:5000')
            .get('/57029ed4795118be119cc43d/reviews')
            .set('Authorization', 'Basic am9lQHNtaXRoLmNvbTpwYXNzd29yZA==')
            .expect(403, done);
    });
});

describe('POST /:courseID/reviews', (done) => {
    it('should return 201 response and return no content', () => {
        request('localhost:5000')
            .get('/5702a1fdf18e6ebd1292282e/reviews')
            .set('Authorization', 'Basic am9lQHNtaXRoLmNvbTpwYXNzd29yZA==')
            .expect(201, done);
    });
});