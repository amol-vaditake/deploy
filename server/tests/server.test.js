/* eslint-disable node/no-unpublished-require */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-arrow-callback */
const request = require('supertest');
const assert = require('assert');
const express = require('express');
const app = require('../app');

app.get('/user', function (req, res) {
  res.status(200).json({ name: 'john' });
});

request(app)
  .get('/user')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '15')
  .expect(200)
  .end(function (err, res) {
    if (err) throw err;
  });

request(app)
  .post('/users/login')
  .send({ email: 'test@gmail.com', password: 'password' })
  .set('Accept', 'application/json')
  .expect(200)
  .end(function (err, res) {
    if (err) throw err;
  });
