const express = require('express');
const app = express();
const DB = require("./database/db.js");
const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const dotenv = require('dotenv');
const session = require('express-session');
dotenv.config();

const db = new DB();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const users = new Array();

app.use(express.static('../client/build'));
app.use(express.json());

app.get('/', (req, res)=>{
  res.json({"Soup" : "Soupreme"});
});

// Use the session middleware, expires after 20 minutes
app.use(session({secret: 'shhhhhhh'})); 

app.post("/auth", async (req, res,) => {
  const {token} = req.body;
  if (token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
    });
    if (!ticket) 
      return res.sendStatus(401); //unauthorized (token invalid)
    const { name, email, picture } = ticket.getPayload();

    const user = {"name" : name, "email": email, "picture": picture};
    const existsAlready = users.findIndex(element => element.email === email);
    if (existsAlready < 0) {
      //insert
      users.push(user);
    } else {
      //update
      users[existsAlready] = user;
    }

    // //create a session, using email as the unique identifier
    req.session.regenerate(function(err) {
      if (err) {
        return res.sendStatus(500); //server error, couldn't create the session
      }
      //store the user's info in the session
      req.session.user = user;
      res.json({user: user});
    });
    }
  }
  // TODO: you may want to upsert (update or insert if new) the user's name, email and picture in the database - step 4

  //TODO: create a session cookie send it back to the client - step 5

);

//middleware to verify the session
function isAuthenticated(req, res, next) {
  if (!req.session.user){
    return res.sendStatus(401); //unauthorized
  }
  next();
}

//route for authenticated users only
app.get("/protected",
  isAuthenticated,
  function (req, res) {
    //would actually be doing something
    res.sendStatus(200); 
  }
);

app.get("/logout", isAuthenticated, function (req, res) {
  //destroy the session
  req.session.destroy(function(err) {
    //callback invoked after destroy returns
    if (err) {
      return res.sendStatus(500); //server error, couldn't destroy the session
    }
    res.clearCookie('id'); //clear the cookie
    res.sendStatus(200);
  });  
});

app.post('/api/v1/login', login);
async function login(req, res) {
  const { email, password} = req.body;
  if (email && password) {
    const profile = await db.getProfile( {"email": email} );
    if (profile) {
      const token = jwt.sign({exp: Math.floor(Date.now() / 1000) + (60 * 60), email: email}, password);
      //res.status(200).json({ status: 200, message: 'Successful' });
      return res.json((JSON.stringify({token})));
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

  let results = await db.getDreamJournals( req.params.email );

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