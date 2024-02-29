const request = require('supertest');
const { app } = require('../api');
//TO DO: mock and import db here as well
const DB = require('../database/db')
jest.mock('../database/db')

describe('GET /api/v1/profile/:email', () => {
  test('It should respond with user profile for a valid email', async () => {
    const mockProfile = { email: 'test@example.com', firstName: 'Ashley', lastName: 'Vu' };
    jest.spyOn(DB.prototype, 'getProfile').mockResolvedValue(mockProfile);
    const response = await request(app).get('/api/v1/profile/test@example.com');
    expect(response.status).toBe(200);
    expect(response.body.profile).toEqual(mockProfile);
  });
});

describe('POST /api/v1/profile/new', () => {
  test('It should create a new profile', async () => {
    const newProfile = {
      email: 'newuser@example.com',
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
describe('GET /api/v1/entries/:email', () => {
  test('It should respond with dream entries for a valid user', async () => {
    const mockDreams = [{ date: '2024-02-28', title: 'Dream 1', description: 'Description 1' }];
    jest.spyOn(require('./database/db.js'), 'getDreamJournals').mockResolvedValue(mockDreams)
    const response = await request(app).get('/api/v1/entries/test@example.com');
    expect(response.status).toBe(200);
    expect(response.body.dreams).toEqual(mockDreams);
  });
}
);
