const request = require('supertest');
const { app } = require('../api');
//TO DO: mock and import db here as well
const DB = require('../database/db')
jest.mock('../database/db')


describe('GET /api/v1/profile/:email', () => {
  test('It should respond with user profile for a valid email', async () => {
    const mockProfile = { email: 'test@example.com', firstName: 'John', lastName: 'Doe' };
    jest.spyOn(DB.prototype, 'getProfile').mockResolvedValue(mockProfile);

    const response = await request(app).get('/api/v1/profile/test@example.com');
    expect(response.status).toBe(200);
    expect(response.body.profile).toEqual(mockProfile);
  });

  test('It should handle profile not found', async () => {
    jest.spyOn(DB.prototype, 'getProfile').mockResolvedValue(null);

    const response = await request(app).get('/api/v1/profile/nonexistent@example.com');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Profile not found');
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
    expect(DB.prototype.insertProfile).toHaveBeenCalledWith(newProfile);
  });
});

