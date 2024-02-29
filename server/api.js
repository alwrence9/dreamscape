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
  return res.status(401).json({ status: 401, message: 'Profile missing information' });

}

//Get sleep logs for the week for a specific user
app.get('/api/v1/sleeplogs/:email', getSleepLogs);
async function getSleepLogs(req, res){

  const start = Number(req.query.start);
  const end = Number(req.query.end);
  
  let results = await db.getSleepLogs( req.params.email);

  if(start && end){
    results = results.filter(
      (sleepLogEntry) => {return start <= sleepLogEntry.date.sinceEpoch && sleepLogEntry.date.sinceEpoch <= end}
    );
  }

  if (results.length != 0){
    return res.json({"sleepLogs": results});
  }

  return res.status(404).send({status: '404', message: 'No entries found for that user'});
}

//Creates a sleep log for a specified user
app.post('/api/v1/sleeplogs/new', createSleepLog);
async function createSleepLog(req, res) {

  let { email, date, sleephours, comment } = req.body;

  if(!comment){
    comment = "";
  }

  if(!date){
    return res.status(401).json({ status: 401, message: 'Sleep log missing date.' });
  }

  if (date.string && date.sinceEpoch && email && sleephours && comment !== undefined) {
    db.insertSleepLog({
      "email": email,
      "date": date,
      "hoursSlept": sleephours,
      "notes": comment
    });
    return res.status(200).json({ status: 201, message: 'Successful' });
  }
  return res.status(401).json({ status: 401, message: 'Sleep log missing information' });

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

  let { email, date, subject, description } = req.body;

  if(!date){
    return res.status(401).json({ status: 401, message: ' comment format' });
  }

  if(!description){
    description = "";
  }

  if (email && date.string && date.sinceEpoch && subject) {

    db.insertDreamJournal({"email": email, "date": date, "title": subject, "description": description});
    return res.status(200).json({ status: 201, message: 'Successful' });
  }
  return res.status(401).json({ status: 401, message: 'Journal entry missing information' });
}

//TO-DO: These to be done in here and do the db questions as well, make sure the questions.json to be done
//and functions to categorize sleepers into chronotypes and sleepers for insomnia
// app.get('/api/v1/questions-type', getQuestionsType);
// app.get('/api/v1/questions-insomnia', getQuestionsInsomnia);



// 404 route
app.use((req, res) => {
  res.status(404).json({ message: '404 - Not Found' });
});

module.exports = { app };