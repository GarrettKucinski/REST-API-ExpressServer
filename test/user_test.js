'use strict';
const app = require('../src/app');
const request = require('supertest');

describe('verifyUserData', () => {
    it('should return the data for the currently authenticated user', (done) => {
        request(app)
            .get('/api/users')
            .set('Authorization', 'Basic am9lQHNtaXRoLmNvbTpwYXNzd29yZA==')
            .expect(req => {
                req.headers['Authorization'] = 'Basic am9lQHNtaXRoLmNvbTpwYXNzd29yZA==';
                console.log(req.headers);
                console.log(req.body);
            })
            .expect(200, done);
    });
});