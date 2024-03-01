const request = require('supertest');
const { app } = require('../api.js');
const DB = require('../database/db.js');

jest.mock('../database/db.js');

const entry1 = {
  "email": "chadrew.brodzay@gmail.com",
  "date": { "string": "2-26-2024", "sinceEpoch": 1708923600000 },
  "hoursSlept": 10,
  "notes": "I woke up at 1:00 because of a dream where my students worship me."
}
const entry2 = {
  "email": "chadrew.brodzay@gmail.com",
  "date": { "string": "2-28-2024", "sinceEpoch": 1709010000000 },
  "hoursSlept": 10,
  "notes": "I had the best sleep ever."
}

const data=[entry1, entry2];

test('It should respond with 2 sleep logs', async () => {
  jest.spyOn(DB.prototype, 'getSleepLogs').mockResolvedValue(data);
  const response = await request(app).get('/api/v1/sleeplogs/chadrew.brodzay@gmail.com');
  expect(response.status).toBe(200);
  expect(response.body.sleepLogs[0].notes).toEqual("I woke up at 1:00 because of a dream where my students worship me.");
  expect(response.body.sleepLogs[1].notes).toEqual("I had the best sleep ever.");
});

test('It should respond with 2 sleep logs', async () => {
  jest.spyOn(DB.prototype, 'getSleepLogs').mockResolvedValue(data);
  const start = new Date("2-25-2024");
  const end = new Date("2-27-2024");
  const response = await request(app).get(`/api/v1/sleeplogs/chadrew.brodzay@gmail.com?start=${start.getTime()}&end=${end.getTime()}`);
  expect(response.status).toBe(200);
  expect(response.body.sleepLogs[0].notes).toEqual("I woke up at 1:00 because of a dream where my students worship me.");
});

test('It should respond with 2 sleep logs', async () => {
  jest.spyOn(DB.prototype, 'getSleepLogs').mockResolvedValue(data);
  const start = new Date("2-27-2024");
  const end = new Date("2-29-2024");
  const response = await request(app).get(`/api/v1/sleeplogs/chadrew.brodzay@gmail.com?start=${start.getTime()}&end=${end.getTime()}`);
  expect(response.status).toBe(200);
  expect(response.body.sleepLogs[0].notes).toEqual("I had the best sleep ever.");
});

test('It should create a new profile', async () => {
  const newEntry = {
    "email": "chadrew.brodzay@gmail.com",
    "date": { "string": "2-27-2024", "sinceEpoch": 1708923600000 },
    "hoursSlept": 1,
    "notes": "I had no sleep because I had to grade my students."
  }
  jest.spyOn(DB.prototype, 'insertSleepLog').mockImplementation(() => {});
  const response = await request(app).post('/api/v1/sleeplogs/new').send(newEntry);
  expect(response.status).toBe(201);
  expect(response.body.message).toBe('Successful');
});

