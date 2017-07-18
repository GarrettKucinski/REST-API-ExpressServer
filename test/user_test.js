'use strict';

const request = require('supertest');

describe('GET /api/users', (done) => {
    it('should return the data for the currently authenticated user', () => {
        return request('localhost:5000')
            .get('/api/users')
            .set('Authorization', 'Basic am9lQHNtaXRoLmNvbTpwYXNzd29yZA==')
            .expect(200)
            .expect(res => {
                res.body._id = "57029ed4795118be119cc437";
            }, done);
    });
});

describe('POST /api/users', () => {
    it('should')
});