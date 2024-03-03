const request = require('supertest');
const { app } = require('../api.js');
const DB = require('../database/db.js');

jest.mock('../database/db.js');

const ChadrewBrozay = { email: 'chadrew.brodzay@example.com', password: "password", firstName: 'Chadrew', lastName: 'Brodzay' }
const GooseGoosersson = { email: 'goose.goosersson@example.com', password: "password", firstName: 'Goose', lastName: 'Goosersson' }

test('It should respond with user profile for a valid email', async () => {
  jest.spyOn(DB.prototype, 'getProfile').mockResolvedValue(GooseGoosersson);
  const response = await request(app).get('/api/v1/profile/goose.goosersson@example.com');
  expect(response.status).toBe(200);
  expect(response.body.profile.firstName).toEqual(GooseGoosersson.firstName);
  expect(response.body.profile.lastName).toEqual(GooseGoosersson.lastName);
  expect(response.body.profile.email).toEqual(GooseGoosersson.email);
});

test('It should create a new profile', async () => {
  const newProfile = {
    email: 'new.user@example.com',
    password: 'password123',
    firstname: 'New',
    lastname: 'User',
  };
  jest.spyOn(DB.prototype, 'insertProfile').mockImplementation(() => {});
  const response = await request(app).post('/api/v1/profile/new').send(newProfile);
  expect(response.status).toBe(201);
  expect(response.body.message).toBe('Successful');

});

