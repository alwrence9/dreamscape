const request = require('supertest');
const { app } = require('../api.js');
const DB = require('../database/db.js');

jest.mock('../database/db.js');

const ChadrewBrozay = {
  "email": "chadrew.brozay@gmail.com",
  "date": { "string": "2-26-2024", "sinceEpoch": 1708923600000 },
  "hoursSlept": 10,
  "notes": "I woke up at 1:00 because of a dream where my students worship me."
}
const GooseGoosersson = {
  "email": "chadrew.brozay@gmail.com",
  "date": { "string": "2-28-2024", "sinceEpoch": 1709010000000 },
  "hoursSlept": 10,
  "notes": "I woke up at 1:00 because of a dream where my students worship me."
}

describe('GET /api/v1/sleeplogs/:email', () => {
  test('It should respond with 2 sleep logs', async () => {
    jest.spyOn(DB.prototype, 'getSleepLogs').mockResolvedValue(GooseGoosersson);
    const response = await request(app).get('/api/v1/profile/goose.goosersson@example.com');
    expect(response.status).toBe(200);
    expect(response.body.profile.firstName).toEqual(GooseGoosersson.firstName);
    expect(response.body.profile.lastName).toEqual(GooseGoosersson.lastName);
    expect(response.body.profile.email).toEqual(GooseGoosersson.email);
  });
});

describe('POST /api/v1/profile/new', () => {
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
});

