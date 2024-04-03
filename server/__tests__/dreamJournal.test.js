const request = require('supertest');
const { app } = require('../api.js');
const DB = require('../database/db.js');

jest.mock('../database/db.js');

const entry1 = {
  "email": "chadrew.brodzay@gmail.com",
  "date": { "string": "2-26-2024", "sinceEpoch": 1708923600000 },
  "title": "Class was cancelled",
  "description": "Class was cancelled, but I showed up anyways. 😎"
}
const entry2 = {
  "email": "chadrew.brodzay@gmail.com",
  "date": { "string": "2-28-2024", "sinceEpoch": 1709010000000 },
  "title": "Haunting Students",
  "description": "My students keep sending me soup pictures and the Key to the Misty Mountain."
}

const data=[entry1, entry2];

test('It should respond with 2 dream journal entries', async () => {
  jest.spyOn(DB.prototype, 'getDreamJournals').mockResolvedValue(data);
  const response = await request(app).get('/api/v1/dreams/chadrew.brodzay@gmail.com');
  expect(response.status).toBe(200);
  expect(response.body.dreams[0].description).toEqual("Class was cancelled, but I showed up anyways. 😎");
  expect(response.body.dreams[1].description).toEqual("My students keep sending me soup pictures and the Key to the Misty Mountain.");
});

test('It should respond with 1 dream journal entry', async () => {
  jest.spyOn(DB.prototype, 'getDreamJournals').mockResolvedValue(data);
  const start = new Date("2-25-2024");
  const end = new Date("2-27-2024");
  const response = await request(app).get(`/api/v1/dreams/chadrew.brodzay@gmail.com?start=${start.getTime()}&end=${end.getTime()}`);
  expect(response.status).toBe(200);
  expect(response.body.dreams[0].description).toEqual("Class was cancelled, but I showed up anyways. 😎");
});

test('It should respond with 1 dream journal entry', async () => {
  jest.spyOn(DB.prototype, 'getDreamJournals').mockResolvedValue(data);
  const start = new Date("2-27-2024");
  const end = new Date("2-29-2024");
  const response = await request(app).get(`/api/v1/dreams/chadrew.brodzay@gmail.com?start=${start.getTime()}&end=${end.getTime()}`);
  expect(response.status).toBe(200);
  expect(response.body.dreams[0].description).toEqual("My students keep sending me soup pictures and the Key to the Misty Mountain.");
});

test('It should respond with 0 dream journal entries, 200', async () => {
  jest.spyOn(DB.prototype, 'getDreamJournals').mockResolvedValue(data);
  const start = new Date("3-27-2024");
  const end = new Date("3-29-2024");
  const response = await request(app).get(`/api/v1/dreams/chadrew.brodzay@gmail.com?start=${start.getTime()}&end=${end.getTime()}`);
  expect(response.status).toBe(200);
  expect(response.body.message).toEqual("No entries found for that time frame");
});

test('It should create a new dream journal entry', async () => {
  const newEntry = {
    "email": "chadrew.brodzay@gmail.com",
    "date": { "string": "2-27-2024", "sinceEpoch": 1708923600000 },
    "title": "Robots Everywhere",
    "description": "What is a robot? Everything! ROBOTS EVERYWHERE!"
  }
  jest.spyOn(DB.prototype, 'insertDreamJournal').mockImplementation(() => {});
  const response = await request(app).post('/api/v1/dreams/new').send(newEntry);

  expect(response.status).toBe(201);
  expect(response.body.message).toBe('Successful');
});

test('It should return 401, missing date', async () => {
  const newEntry = {
    "email": "chadrew.brodzay@gmail.com",
    "title": "Robots Everywhere",
    "description": "What is a robot? Everything! ROBOTS EVERYWHERE!"
  }
  jest.spyOn(DB.prototype, 'insertDreamJournal').mockImplementation(() => {});
  const response = await request(app).post('/api/v1/dreams/new').send(newEntry);
  expect(response.status).toBe(401);
  expect(response.body.message).toBe('Missing date for dream journal entry');
});

test('It should return 401, not enough info', async () => {
  const newEntry = {
    "email": "chadrew.brodzay@gmail.com",
    "date": { "string": "2-27-2024"},
    "title": "Robots Everywhere",
    "description": "What is a robot? Everything! ROBOTS EVERYWHERE!"
  }
  jest.spyOn(DB.prototype, 'insertDreamJournal').mockImplementation(() => {});
  const response = await request(app).post('/api/v1/dreams/new').send(newEntry);
  expect(response.status).toBe(401);
  expect(response.body.message).toBe('Dream journal entry missing information');
});