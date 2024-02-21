const request = require('supertest');
const { app } = require('../api');
//TO DO: mock and import db here as well

jest.mock('../database/db')

//Test posting a comment
describe('GET /', () => {
  test('It should respond with a json array', async () => {
    expect(true).toBe(true);
  });
});



