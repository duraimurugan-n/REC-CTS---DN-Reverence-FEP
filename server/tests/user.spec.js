const request = require('supertest');
const {server, appServer} = require('../server.js');
const mongoose = require('mongoose');

require("dotenv").config();


/* Connecting to the database before each test. */
beforeAll(done => {
  done();
})
afterAll(done => {
  appServer.close();
  done();
})

beforeEach(async () => {
  await mongoose.connect(
    process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe('Test /user', () => {

    describe('User check on /login', () => {
      it('Login should be okay', async () => {
        const res =  await request(server).post('/user/login').send({
          "email":"210701080@rajalakshmi.edu.in",
          "password":"admin"
        });
        expect(res.status).toBe(200);
      });
    });

    describe('User check on /login', () => {
      it('Login should be okay', async () => {
        const res =  await request(server).post('/user/login').send({
          "email":"210701080@rajalakshmi.edu.in",
          "password":"notadmin"
        });
        expect(res._body.message).toBe('Invalid Password');
      });
    });

});

describe('Test /logout', () => {

  it('Logout should be okay', async () => {
    const res =  await request(server).get('/logout');
    expect(res.status).toBe(200);
  });

});