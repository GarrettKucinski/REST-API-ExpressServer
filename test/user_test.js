'use strict';

const request = require('supertest');

describe('GET /api/users', (done) => {
    it('should return the data for the currently authenticated user', () => {
        return request('localhost:5000')
            .get('/api/users')
            .set('Authorization', 'Basic am9lQHNtaXRoLmNvbTpwYXNzd29yZA==')
            .expect(200)
            .expect(res => {
                res.body._id === "57029ed4795118be119cc437";
            }, done);
    });
});

describe('GET NO_AUTH /api/users', (done) => {
    it('should return a 401 error response for an unauthorized request', () => {
        return request('localhost:5000')
            .get('/api/users')
            .expect(err => {
                err.status === 401;
                err.message === 'Could not authenticate, user not found.';
            }, done);
    });
});