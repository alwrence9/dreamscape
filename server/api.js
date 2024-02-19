const express = require('express');
const app = express();

app.use(express.static('../client/build'));
app.use(express.json());

app.get('/', (req, res)=>{
  res.json({"Soup" : "Soupreme"});
});

//Gets the profile of a user for when they login
app.get('/api/v1/profile', getProfile);
async function getProfile(req, res) {
  res.json("hello world");
}

//Create a profile for a user when they sign up
app.post('/api/v1/profile', createProfile);
async function createProfile(req, res) {
  res.json("hello world");
}

//Get sleep logs for the week for a specific user
app.get('/api/v1/sleeplogs/:email', getSleepLogs);
async function getSleepLogs(req, res) {
  res.json("hello world");
}

//Creates a sleep log for a specified user
app.post('/api/v1/sleeplogs/new/:email', createSleepLog);
async function createSleepLog(req, res) {
  res.json("hello world");
}

//Gets the journal entry for a specified user
app.get('/api/v1/entries/:email', getEntry);
async function getEntry(req, res) {
  res.json("hello world");
}

//Create a new journal entry for a specified user
app.get('/api/v1/entries/new/:email', createEntry);
async function createEntry(req, res) {
  res.json("hello world");
}

// 404 route
app.use((req, res) => {
  res.status(404).json({ message: '404 - Not Found' });
});

module.exports = { app };
