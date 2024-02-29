const request = require('supertest');
const { app } = require('../api.js');
const {DB} = require('../database/db.js');

jest.mock('../database/db.js');

test('Testing', 
  async () => {
    expect(1).toEqual(1);
  });

