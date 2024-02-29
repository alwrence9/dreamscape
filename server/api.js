const express = require('express');
const app = express();
const DB = require("./database/db.js");
const jwt = require('jsonwebtoken');

const db = new DB();

app.use(express.static('../client/build'));
app.use(express.json());

app.get('/', (req, res)=>{
  res.json({"Soup" : "Soupreme"});
});

app.post('/api/v1/login', login);
async function login(req, res) {
  const { email, password} = req.body;
  if (email && password) {
    const profile = await db.getProfile( {"email": email} );
    if (profile) {
      const token = jwt.sign({email: email}, password);
      res.status(200).json({ status: 200, message: 'Successful' });
      return res.json(({token}));
    }
  }
  return res.status(401).json({ status: 401, message: 'Wrong comment format' });
}

//Gets the profile of a user for when they login
app.get('/api/v1/profile/:email', getProfile);
async function getProfile(req, res) {
  res.type('json');
  
  let profile = await db.getProfile( req.params.email );
  
  if(profile){
    return res.json( {"profile": profile});
  }
  else{
    return res.status(404).send({status: '404', message: "Profile not found"});
  }
}

//Create a profile for a user when they sign up
app.post('/api/v1/profile/new', createProfile);
async function createProfile(req, res) {
  const { email, password, firstname, lastname } = req.body;
  const emailPattern = /^([A-z]|[0-9]|\.|-)+@[a-z]+(\.[a-z]+)+$/g;

  if (email.match(emailPattern) && password && firstname && lastname) {
    db.insertProfile({ "email": email, "password": password, "firstName": firstname, "lastName": lastname });
    return res.status(201).json({ status: 201, message: 'Successful' });
  }
  return res.status(401).json({ status: 401, message: 'Wrong profile format' });

}

//Get sleep logs for the week for a specific user
app.get('/api/v1/sleeplogs/:email', getSleepLogs);
async function getSleepLogs(req, res) {

  //THIS IS A DEMO FOR HOW DATE QUERY WORKS
  //START AND END ARE INTEGERS OBTAINED BY THE Date.GetTime() method.
  const test = [
    new Date('2024-1-1'),
    new Date('2024-2-1'),
    new Date('2024-3-1'),
    new Date('2024-4-1'),
    new Date('2024-5-1'),
    new Date('2024-6-1')
  ];

  const start = Number(req.query.start);
  const end = Number(req.query.end);

  let results = []

  if(start && end){
    results = test.filter(
      (date) => {return start <= date.getTime() && date.getTime() <= end}
    );
    
    results = results.map(
      (date) => {return date.toString()}
    )

    res.json({"sleeplogs": results});
    return;
  }

  res.status(404).send({status: '404', message: 'User not found'});

}

//Creates a sleep log for a specified user
app.post('/api/v1/sleeplogs/new', createSleepLog);
async function createSleepLog(req, res) {
  const { date, email, sleephours, comment } = req.body;
  if (date && email && sleephours && comment) {
    //TO DO: INSERT NEW SLEEPLOG INTO DB
    return res.status(200).json({ status: 200, message: 'Successful' });
  }
  return res.status(401).json({ status: 401, message: 'Wrong comment format' });

}

//Gets the journal entry for a specified user
app.get('/api/v1/entries/:email', getEntry);
async function getEntry(req, res) {

  const start = Number(req.query.start);
  const end = Number(req.query.end);
  const date = req.query.date;

  let results = await db.getDreamJournals( req.params.email );

  if(date){
    results = results.filter(
      (journalEntry) => {return journalEntry.date.string == date}
    );
  }

  if(start && end){
    results = results.filter(
      (journalEntry) => {return start <= journalEntry.date.sinceEpoch && journalEntry.date.sinceEpoch <= end}
    );
  }

  if (results.length != 0){
    return res.json({"dreams": results});
  }

  return res.status(404).send({status: '404', message: 'No entries found for that user'});
}

//Create a new journal entry for a specified user
app.get('/api/v1/entries/new', createEntry);
async function createEntry(req, res) {

  const { email, date, subject, description } = req.body;

  if (email && date.string && date.sinceEpoch && subject && description) {
    db.insertDreamJournal({"email": email, "date": date, "title": subject, "description": description});
    return res.status(200).json({ status: 200, message: 'Successful' });
  }

  return res.status(401).json({ status: 401, message: 'Wrong comment format' });
}

// 404 route
app.use((req, res) => {
  res.status(404).json({ message: '404 - Not Found' });
});

module.exports = { app };